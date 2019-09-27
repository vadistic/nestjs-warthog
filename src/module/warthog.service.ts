import { Injectable, Inject, OnModuleInit } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import mkdirp from 'mkdirp'
import { promisify } from 'util'
import { writeFile } from 'fs'
import path from 'path'

import { WARTHOG_OPTIONS } from './wathog.constants'
import { WarthogModuleOptions } from '../options'
import { generate } from '../generator/generate'

const mkdirP = promisify(mkdirp)
const writeFileP = promisify(writeFile)

@Injectable()
export class WarthogService implements OnModuleInit {
  constructor(
    @Inject(WARTHOG_OPTIONS)
    private readonly options: WarthogModuleOptions,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async onModuleInit() {
    const isEnabled =
      this.options.disabled === undefined
        ? process.env.NODE_ENV === 'development'
        : !this.options.disabled

    if (isEnabled) {
      await mkdirP(path.dirname(this.options.path))

      const definitions = await generate(this.connection.entityMetadatas, {
        ...this.options,
        connection: this.connection,
      })

      await writeFileP(this.options.path, definitions, 'utf-8')
    }
  }
}
