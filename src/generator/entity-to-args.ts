import { EntityMetadata } from 'typeorm'

import { niceString } from '../utils'

// FIND

export const entityToFindOneArgs = (entity: EntityMetadata): string => {
  return niceString`
    @ArgsType()
    export class ${entity.name}WhereUniqueArgs {
      @Field(() => ${entity.name}WhereInput)
      where!: ${entity.name}WhereUniqueInput
    }
  `
}

// FIND MANY

export const entityToFindArgs = (entity: EntityMetadata): string => {
  return niceString`
    @ArgsType()
    export class ${entity.name}WhereArgs extends PaginationArgs {
      @Field(() => ${entity.name}WhereInput, { nullable: true })
      where?: ${entity.name}WhereInput
      @Field(() => ${entity.name}OrderByEnum, { nullable: true })
      orderBy?: ${entity.name}OrderByEnum
    }
  `
}

// CREATE

export const entityToCreateArgs = (entity: EntityMetadata): string => {
  return niceString`
    @ArgsType()
    export class ${entity.name}CreateArgs {
      @Field(() => ${entity.name}CreateInput)
      data!: ${entity.name}CreateInput
    }
  `
}

// CREATE MANY

export const entityToCreateManyArgs = (entity: EntityMetadata): string => {
  return niceString`
    @ArgsType()
    export class ${entity.name}CreateManyArgs {
      @Field(() => [${entity.name}CreateInput])
      data!: ${entity.name}CreateInput[]
    }
  `
}

// UPDATE

export const entityToUpdateArgs = (entity: EntityMetadata): string => {
  return niceString`
    @ArgsType()
    export class ${entity.name}UpdateArgs {
      @Field(() => ${entity.name}UpdateInput)
      data!: ${entity.name}UpdateInput
      @Field(() => ${entity.name}WhereUniqueInput)
      where!: ${entity.name}WhereUniqueInput
    }
  `
}

// UPDATE MANY

export const entityToUpdateManyArgs = (entity: EntityMetadata): string => {
  return niceString`
    @ArgsType()
    export class ${entity.name}UpdateManyArgs {
      @Field(() => ${entity.name}UpdateInput)
      data!: ${entity.name}UpdateInput
      @Field(() => ${entity.name}WhereInput)
      where!: ${entity.name}WhereInput
    }
  `
}

// DELETE

export const entityToDeleteArgs = (entity: EntityMetadata): string => {
  return niceString`
    @ArgsType()
    export class ${entity.name}DeleteArgs {
      @Field(() => ${entity.name}WhereUniqueInput)
      where!: ${entity.name}WhereUniqueInput
    }
  `
}

// DELETE MANY

export const entityToDeleteManyArgs = (entity: EntityMetadata): string => {
  return niceString`
    @ArgsType()
    export class ${entity.name}DeleteManyArgs {
      @Field(() => ${entity.name}WhereInput)
      where!: ${entity.name}WhereInput
    }
  `
}
