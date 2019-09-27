import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { typeOrmOptions } from './fixture/connection'
import { Photo } from './fixture/photo.entity'
import { WarthogModule } from '../src/module/warthog.module'
import { WarthogModuleOptions } from '../src/options'
import Post from './fixture/post.entity'
import { PostModule } from './fixture/post.module'

export const options: WarthogModuleOptions = {
  path: './generated/warthog.ts',
  shouldSkipPrettier: false,
  disabled: undefined,
}

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), WarthogModule],
})
class PhotoModule {}

describe('module', () => {
  let mod: TestingModule

  beforeAll(async () => {
    mod = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...typeOrmOptions, entities: [Photo, Post] }),
        WarthogModule.forRoot(options),
        PhotoModule,
        PostModule,
      ],
    }).compile()
  })

  afterAll(async () => {
    await mod.close()
  })

  it('module inits & generate definitions', async () => {
    await mod.init()
  })
})
