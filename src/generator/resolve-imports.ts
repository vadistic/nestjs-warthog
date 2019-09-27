import path from 'path'
import glob from 'glob'
import { EntitySchema } from 'typeorm'
import { promisify } from 'util'

import { WarthogModuleOptions } from '../options'

const globP = promisify(glob)

export const resolveImports = async (opts: WarthogModuleOptions) => {
  const resolvePath = (from: string) => {
    const fromFile = path.basename(from).replace(/.ts$/, '')
    const fromDir = path.dirname(from)
    const outDir = path.dirname(opts.path)

    return path.normalize(path.join(path.relative(outDir, fromDir), fromFile))
  }

  const namedImportLine = (names: string[], from: string) =>
    `import { ${names.join(', ')} } from '${resolvePath(from)}'`

  const defaultImportLine = (name: string, from: string) =>
    `import ${name} from '${resolvePath(from)}'`

  // that's how typeorm does it
  // https://github.com/typeorm/typeorm/blob/e12479ed43c4c5361de8d4b9c55120e2aa9ccb22/src/util/DirectoryExportedClassesLoader.ts
  const isEntity = (exported: any) =>
    typeof exported === 'function' || exported instanceof EntitySchema

  const paths = await globP(opts.entities, { nodir: true, ignore: '**/node_modules/**' })
  const imports = await Promise.all(paths.map(file => import(path.join(process.cwd(), file))))

  const results: string[] = []

  // fastest loop^^
  // TODO: check how it works without esModulesInterop or with node require()
  for (let i = 0; i < paths.length; i++) {
    const from = paths[i]
    const file = imports[i]

    const exps = Object.entries<any>(file).filter(([, val]) => isEntity(val))

    // case default
    const [firstName, firstVal] = exps[0]

    if (exps.length === 1 && firstName === 'default') {
      results.push(defaultImportLine(firstVal.name, from))
      continue
    }

    // case mix of namex + optional default
    // TODO: case where named export is also exported as default
    if (exps.length >= 0) {
      const names = exps.map(([key, val]) => (key === 'default' ? `default as ${val.name}` : key))

      results.push(namedImportLine(names, from))
      continue
    }

    console.warn(`File: ${from} matching entities glob has no valid exports.`)
  }

  return results
}
