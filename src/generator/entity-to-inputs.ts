import { EntityMetadata } from 'typeorm'
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata'
import { GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt } from 'graphql'
import { GraphQLISODateTime } from 'type-graphql'

import {
  columnTypeToGraphQLDataType,
  columnToTypeScriptType,
  uniquesForEntity,
  columnToTypes,
} from './typeorm-converter'
import { niceString, indent } from '../utils'

const CREATE_UPDATE_BLACKLIST = [
  'createdAt',
  'createdById',
  'updatedAt',
  'updatedById',
  'deletedAt',
  'deletedById',
]

// WHERE UNIQUE

export const entityToWhereUniqueInput = (entity: EntityMetadata): string => {
  const uniques = uniquesForEntity(entity)

  const numUniques = entity.columns.reduce<number>((num, column: ColumnMetadata) => {
    if (uniques.includes(column.propertyName) || column.isPrimary) {
      num++
    }

    return num
  }, 0)

  // If there is only one unique field, it should not be nullable
  const uniqueFieldsAreNullable = numUniques > 1

  let fieldsTemplate = ''

  entity.columns.forEach((column: ColumnMetadata) => {
    if (uniques.includes(column.propertyName) || column.isPrimary) {
      const nullable = uniqueFieldsAreNullable ? ', { nullable: true }' : ''
      const graphQLDataType = columnTypeToGraphQLDataType(column)
      const tsType = columnToTypeScriptType(column)

      fieldsTemplate += niceString`
        @Field(() => ${graphQLDataType}${nullable})
        ${column.propertyName}?: ${tsType}
      `
    }
  })

  return niceString`
    @InputType()
    export class ${entity.name}WhereUniqueInput {
    ${indent(fieldsTemplate)}
    }
  `
}

// WHERE

export const entityToWhereInput = (entity: EntityMetadata): string => {
  let fieldTemplates = ''

  entity.columns.forEach((column: ColumnMetadata) => {
    const { graphqlType, tsType } = columnToTypes(column)
    const graphQLDataType = columnTypeToGraphQLDataType(column)

    // TODO: for foreign key fields, only allow the same filters as ID below
    // Example: photo.userId: String
    if (column.isPrimary || graphqlType === GraphQLID) {
      fieldTemplates += niceString`
        @Field(() => ${graphQLDataType},{ nullable: true })
        ${column.propertyName}_eq?: string
        @Field(() => [${graphQLDataType}], { nullable: true })
        ${column.propertyName}_in?: string[]
      `
    } else if (graphqlType === GraphQLString) {
      fieldTemplates += niceString`
        @Field({ nullable: true })
        ${column.propertyName}_eq?: ${tsType}
        @Field({ nullable: true })
        ${column.propertyName}_not?: ${tsType}
        @Field({ nullable: true })
        ${column.propertyName}_contains?: ${tsType}
        @Field({ nullable: true })
        ${column.propertyName}_startsWith?: ${tsType}
        @Field({ nullable: true })
        ${column.propertyName}_endsWith?: ${tsType}
        @Field(() => [${graphQLDataType}], { nullable: true })
        ${column.propertyName}_in?: ${tsType}[]
      `
    } else if (graphqlType === GraphQLFloat || graphqlType === GraphQLInt) {
      fieldTemplates += niceString`
        @Field({ nullable: true })
        ${column.propertyName}_eq?: ${tsType}
        @Field({ nullable: true })
        ${column.propertyName}_gt?: ${tsType}
        @Field({ nullable: true })
        ${column.propertyName}_gte?: ${tsType}
        @Field({ nullable: true })
        ${column.propertyName}_lt?: ${tsType}
        @Field({ nullable: true })
        ${column.propertyName}_lte?: ${tsType}
        @Field(() => [${graphQLDataType}], { nullable: true })
        ${column.propertyName}_in?: ${tsType}[]
      `
    } else if (graphqlType === GraphQLISODateTime) {
      fieldTemplates += niceString`
        @Field({ nullable: true })
        ${column.propertyName}_gt?: ${tsType}
        @Field({ nullable: true })
        ${column.propertyName}_gte?: ${tsType}
        @Field({ nullable: true })
        ${column.propertyName}_lt?: ${tsType}
        @Field({ nullable: true })
        ${column.propertyName}_lte?: ${tsType}
      `
    } else if (
      column.type !== 'json' &&
      column.type !== 'jsonb' &&
      column.type !== 'varying character'
    ) {
      // TODO: JSON??

      fieldTemplates += niceString`
        @Field(() => ${graphQLDataType}, { nullable: true })
        ${column.propertyName}_eq?: ${graphQLDataType}
        @Field(() => [${graphQLDataType}], { nullable: true })
        ${column.propertyName}_in?: ${graphQLDataType}[]
      `
    }

    fieldTemplates += '\n\n'
  })

  return niceString`
    @InputType()
    export class ${entity.name}WhereInput {
    ${indent(fieldTemplates)}
    }
  `
}

// CREATE

export const entityToCreateInput = (entity: EntityMetadata): string => {
  let fieldTemplates = ''

  entity.columns.forEach((column: ColumnMetadata) => {
    if (
      !column.isPrimary &&
      !column.isCreateDate &&
      !column.isGenerated &&
      !column.isUpdateDate &&
      !column.isVersion &&
      !CREATE_UPDATE_BLACKLIST.includes(column.propertyName)
    ) {
      const graphQLDataType = columnTypeToGraphQLDataType(column)
      const nullable = column.isNullable ? '{ nullable: true }' : ''
      const tsRequired = column.isNullable ? '?' : '!'
      const tsType = columnToTypeScriptType(column)

      // we need to know what the graphql type is and what the tsType is
      // for enums

      if (
        column.enum ||
        column.type === 'json' ||
        column.type === 'jsonb' ||
        column.type === 'varying character'
      ) {
        fieldTemplates += niceString`
          @Field(() => ${graphQLDataType}, ${nullable})
          ${column.propertyName}${tsRequired}: ${tsType}
        `
      } else {
        fieldTemplates += niceString`
          @Field(${nullable})
          ${column.propertyName}${tsRequired}: ${tsType}
        `
      }

      fieldTemplates += '\n'
    }
  })

  return niceString`
    @InputType()
    export class ${entity.name}CreateInput {
    ${indent(fieldTemplates)}
    }
  `
}

// UPDATE

export const entityToUpdateInput = (entity: EntityMetadata): string => {
  let fieldTemplates = ''

  entity.columns.forEach((column: ColumnMetadata) => {
    if (
      !column.isPrimary &&
      !column.isCreateDate &&
      !column.isGenerated &&
      !column.isUpdateDate &&
      !column.isVersion &&
      !CREATE_UPDATE_BLACKLIST.includes(column.propertyName)
    ) {
      // TODO: also don't allow updated foreign key fields
      // Example: photo.userId: String
      const graphQLDataType = columnTypeToGraphQLDataType(column)
      const tsType = columnToTypeScriptType(column)

      if (
        column.enum ||
        column.type === 'json' ||
        column.type === 'jsonb' ||
        column.type === 'varying character'
      ) {
        fieldTemplates += niceString`
          @Field(() => ${graphQLDataType}, { nullable: true })
          ${column.propertyName}?: ${tsType}
        `
      } else {
        fieldTemplates += niceString`
          @Field({ nullable: true })
          ${column.propertyName}?: ${tsType}
        `
      }

      fieldTemplates += '\n'
    }
  })

  return niceString`
    @InputType()
    export class ${entity.name}UpdateInput {
    ${indent(fieldTemplates)}
    }
  `
}
