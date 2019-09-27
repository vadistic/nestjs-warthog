import { ConnectionOptions, createConnection, Connection, EntityMetadata } from 'typeorm'

import { generate } from '../src/generator/generate'
import { WarthogModuleOptions } from '../src/options'
import { typeOrmOptions } from './fixture/connection'
import { Photo } from './fixture/photo.entity'
import Post from './fixture/post.entity'
import {
  entityToFindOneArgs,
  entityToFindArgs,
  entityToCreateArgs,
  entityToCreateManyArgs,
  entityToUpdateArgs,
  entityToUpdateManyArgs,
  entityToDeleteArgs,
  entityToDeleteManyArgs,
} from '../src/generator/entity-to-args'
import { entityToWhereUniqueInput, entityToWhereInput } from '../src/generator/entity-to-inputs'
import { entityToOrderByEnum } from '../src/generator/entity-to-enum'

export const options: WarthogModuleOptions = {
  path: './generated/warthog.ts',
  shouldSkipPrettier: false,
  disabled: undefined,
}

describe('schema', () => {
  let ctn: Connection
  let entity: EntityMetadata

  beforeAll(async () => {
    ctn = await createConnection({
      ...(typeOrmOptions as ConnectionOptions),
      entities: [Photo, Post],
    })

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    entity = ctn.entityMetadatas.find(val => val.name === 'Photo')!
  })

  afterAll(async () => {
    await ctn.close()
  })

  it('generate definitions that match snapshot', async () => {
    const schema = await generate(ctn.entityMetadatas, options)

    expect(schema).toMatchSnapshot()
  })

  it('generates OrderBy enum', () => {
    const res = entityToOrderByEnum(entity)

    expect(res).toMatchInlineSnapshot(`
      "export enum PhotoOrderByEnum {
        createdAt_ASC = 'createdAt_ASC',
        createdAt_DESC = 'createdAt_DESC',
        updatedAt_ASC = 'updatedAt_ASC',
        updatedAt_DESC = 'updatedAt_DESC',
        name_ASC = 'name_ASC',
        name_DESC = 'name_DESC',
        description_ASC = 'description_ASC',
        description_DESC = 'description_DESC',
        filename_ASC = 'filename_ASC',
        filename_DESC = 'filename_DESC',
        views_ASC = 'views_ASC',
        views_DESC = 'views_DESC',
        isPublished_ASC = 'isPublished_ASC',
        isPublished_DESC = 'isPublished_DESC',
        post_ASC = 'post_ASC',
        post_DESC = 'post_DESC',
      }

      registerEnumType(PhotoOrderByEnum, {
        name: 'PhotoOrderByInput'
      })"
    `)
  })

  it('generates WhereUnique input', () => {
    const res = entityToWhereUniqueInput(entity)

    expect(res).toMatchInlineSnapshot(`
      "@InputType()
      export class PhotoWhereUniqueInput {
        @Field(() => String)
        id?: string
      }"
    `)
  })

  it('generates Where input', () => {
    const res = entityToWhereInput(entity)

    expect(res).toMatchInlineSnapshot(`
      "@InputType()
      export class PhotoWhereInput {
        @Field(() => String,{ nullable: true })
        id_eq?: string
        @Field(() => [String], { nullable: true })
        id_in?: string[]
        
        @Field({ nullable: true })
        createdAt_gt?: Date
        @Field({ nullable: true })
        createdAt_gte?: Date
        @Field({ nullable: true })
        createdAt_lt?: Date
        @Field({ nullable: true })
        createdAt_lte?: Date
        
        @Field({ nullable: true })
        updatedAt_gt?: Date
        @Field({ nullable: true })
        updatedAt_gte?: Date
        @Field({ nullable: true })
        updatedAt_lt?: Date
        @Field({ nullable: true })
        updatedAt_lte?: Date
        
        @Field({ nullable: true })
        name_eq?: string
        @Field({ nullable: true })
        name_not?: string
        @Field({ nullable: true })
        name_contains?: string
        @Field({ nullable: true })
        name_startsWith?: string
        @Field({ nullable: true })
        name_endsWith?: string
        @Field(() => [String], { nullable: true })
        name_in?: string[]
        
        @Field({ nullable: true })
        description_eq?: string
        @Field({ nullable: true })
        description_not?: string
        @Field({ nullable: true })
        description_contains?: string
        @Field({ nullable: true })
        description_startsWith?: string
        @Field({ nullable: true })
        description_endsWith?: string
        @Field(() => [String], { nullable: true })
        description_in?: string[]
        
        @Field({ nullable: true })
        filename_eq?: string
        @Field({ nullable: true })
        filename_not?: string
        @Field({ nullable: true })
        filename_contains?: string
        @Field({ nullable: true })
        filename_startsWith?: string
        @Field({ nullable: true })
        filename_endsWith?: string
        @Field(() => [String], { nullable: true })
        filename_in?: string[]
        
        @Field({ nullable: true })
        views_eq?: number
        @Field({ nullable: true })
        views_gt?: number
        @Field({ nullable: true })
        views_gte?: number
        @Field({ nullable: true })
        views_lt?: number
        @Field({ nullable: true })
        views_lte?: number
        @Field(() => [Int], { nullable: true })
        views_in?: number[]
        
        @Field(() => Boolean, { nullable: true })
        isPublished_eq?: Boolean
        @Field(() => [Boolean], { nullable: true })
        isPublished_in?: Boolean[]
        
        @Field({ nullable: true })
        post_eq?: string
        @Field({ nullable: true })
        post_not?: string
        @Field({ nullable: true })
        post_contains?: string
        @Field({ nullable: true })
        post_startsWith?: string
        @Field({ nullable: true })
        post_endsWith?: string
        @Field(() => [String], { nullable: true })
        post_in?: string[]
      }"
    `)
  })

  it('generates findOne args', () => {
    const res = entityToFindOneArgs(entity)

    expect(res).toMatchInlineSnapshot(`
      "@ArgsType()
      export class PhotoWhereUniqueArgs {
        @Field(() => PhotoWhereInput)
        where!: PhotoWhereUniqueInput
      }"
    `)
  })

  it('generates find args', () => {
    const res = entityToFindArgs(entity)

    expect(res).toMatchInlineSnapshot(`
      "@ArgsType()
      export class PhotoWhereArgs extends PaginationArgs {
        @Field(() => PhotoWhereInput, { nullable: true })
        where?: PhotoWhereInput
        @Field(() => PhotoOrderByEnum, { nullable: true })
        orderBy?: PhotoOrderByEnum
      }"
    `)
  })

  it('generates create args', () => {
    const res = entityToCreateArgs(entity)

    expect(res).toMatchInlineSnapshot(`
      "@ArgsType()
      export class PhotoCreateArgs {
        @Field(() => PhotoCreateInput)
        data!: PhotoCreateInput
      }"
    `)
  })

  it('generates createMany args', () => {
    const res = entityToCreateManyArgs(entity)

    expect(res).toMatchInlineSnapshot(`
      "@ArgsType()
      export class PhotoCreateManyArgs {
        @Field(() => [PhotoCreateInput])
        data!: PhotoCreateInput[]
      }"
    `)
  })

  it('generates update args', () => {
    const res = entityToUpdateArgs(entity)

    expect(res).toMatchInlineSnapshot(`
      "@ArgsType()
      export class PhotoUpdateArgs {
        @Field(() => PhotoUpdateInput)
        data!: PhotoUpdateInput
        @Field(() => PhotoWhereUniqueInput)
        where!: PhotoWhereUniqueInput
      }"
    `)
  })

  it('generates updateMany args', () => {
    const res = entityToUpdateManyArgs(entity)

    expect(res).toMatchInlineSnapshot(`
      "@ArgsType()
      export class PhotoUpdateManyArgs {
        @Field(() => PhotoUpdateInput)
        data!: PhotoUpdateInput
        @Field(() => PhotoWhereInput)
        where!: PhotoWhereInput
      }"
    `)
  })

  it('generates delete args', () => {
    const res = entityToDeleteArgs(entity)

    expect(res).toMatchInlineSnapshot(`
      "@ArgsType()
      export class PhotoDeleteArgs {
        @Field(() => PhotoWhereUniqueInput)
        where!: PhotoWhereUniqueInput
      }"
    `)
  })

  it('generates deleteMany args', () => {
    const res = entityToDeleteManyArgs(entity)

    expect(res).toMatchInlineSnapshot(`
      "@ArgsType()
      export class PhotoDeleteManyArgs {
        @Field(() => PhotoWhereInput)
        where!: PhotoWhereInput
      }"
    `)
  })
})
