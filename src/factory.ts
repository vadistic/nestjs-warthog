import { Connection } from 'typeorm'
import mkdirp from 'mkdirp'
import { promisify } from 'util'
import path from 'path'
import { writeFile } from 'fs'

import { WarthogModuleOptions, defaultOptions } from './options'
import { generate } from './generator/generate'

const mkdirP = promisify(mkdirp)
const writeFileP = promisify(writeFile)

/**
 * Allows generating inputs without utilising nestJS module
 *
 * API consistent with `@nestjs/graphql` `GraphQLDefinitionsFactory`
 */

export class WarthogDefinitionsFactory {
  constructor(readonly connection: Connection) {}

  async generate(options?: WarthogModuleOptions) {
    const opts = { ...defaultOptions, ...options, connection: this.connection }

    const definitions = await generate(this.connection.entityMetadatas, opts)

    if (!opts.disabled) {
      await mkdirP(path.dirname(opts.path))
      await writeFileP(opts.path, definitions)
    }

    return definitions
  }
}
