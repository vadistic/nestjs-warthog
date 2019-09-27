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

  async generate(opts?: WarthogModuleOptions) {
    const options = { ...defaultOptions, ...opts, connection: this.connection }

    await mkdirP(path.dirname(options.path))

    const definitions = await generate(this.connection.entityMetadatas, options)

    await writeFileP(options.path, definitions)
  }
}
