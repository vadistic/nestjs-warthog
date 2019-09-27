import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLString,
} from 'graphql'
import { GraphQLISODateTime } from 'type-graphql'
import { EntityMetadata } from 'typeorm'
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata'
import { UniqueMetadata } from 'typeorm/metadata/UniqueMetadata'

import { getMetadataStorage } from './metadata-storage'
import { GraphQLJSONObject } from '../common/json.scalar'

export const uniquesForEntity = (entity: EntityMetadata): string[] =>
  entity.uniques.reduce<string[]>(
    (arr, unique: UniqueMetadata) => {
      return [...arr, ...unique.columns.map((col: ColumnMetadata) => col.propertyName)]
    },
    [] as string[],
  )

export const extractEnumObject = (column: ColumnMetadata): GraphQLEnumType => {
  const storage = getMetadataStorage()
  const modelEnums = column.entityMetadata.inheritanceTree.map(model =>
    storage.getEnum(model.name, column.propertyName),
  )

  return modelEnums.find(m => Boolean(m))
}

export const columnToGraphQLType = (
  column: ColumnMetadata,
): GraphQLScalarType | GraphQLEnumType => {
  // Check to see if this column is an enum and return that
  if (column.enum) {
    return extractEnumObject(column)
  } else if (column.propertyName.match(/Id$/)) {
    return GraphQLID
  }

  // Some types have a name attribute
  const type = (column.type as any).name ? (column.type as any).name : column.type

  switch (type) {
    // TODO: clean up unused types (String and 'String')
    case String:
    case 'String':
    case 'varchar':
    case 'text':
    case 'uuid':
      return GraphQLString
    // TODO: clean up unused types (Boolean and 'Boolean')
    case Boolean:
    case 'Boolean':
    case 'boolean':
    case 'bool':
      return GraphQLBoolean
    // TODO: clean up unused types (Number and 'Number')
    case Number:
    case 'Number':
    case 'float':
    case 'float4':
    case 'float8':
    case 'smallmoney':
    case 'money':
    case 'double':
    case 'dec':
    case 'decimal':
    case 'fixed':
    case 'numeric':
    case 'real':
    case 'double precision':
      return GraphQLFloat
    case 'int':
    case 'smallint':
    case 'mediumint':
    case 'bigint':
    case 'integer':
    case 'int2':
    case 'int4':
    case 'int8':
      return GraphQLInt
    // TODO: clean up unused types (Date and 'Date')
    case Date:
    case 'Date':
    case 'timestamp':
    case 'datetime':
      return GraphQLISODateTime
    case 'json':
    case 'jsonb':
    case 'varying character': // HACK: allows us to generate proper types for sqlite (mock db)
      return GraphQLJSONObject
    default:
      if (type instanceof GraphQLScalarType) {
        return type
      }

      throw new Error(`convertToGraphQLType: Unexpected type: ${type}`)
  }
}

export const columnTypeToGraphQLDataType = (column: ColumnMetadata): string => {
  const graphQLType = columnToGraphQLType(column)

  switch (graphQLType) {
    case GraphQLJSONObject:
      return 'GraphQLJSONObject'
    default:
      return graphQLType.name
  }
}

export const columnToTypeScriptType = (column: ColumnMetadata): string => {
  if (column.isPrimary) {
    return 'string'
  } else if (column.enum) {
    return extractEnumObject(column).name
  } else {
    const graphqlType = columnTypeToGraphQLDataType(column)

    const typeMap: any = {
      Boolean: 'boolean',
      DateTime: 'Date',
      Float: 'number',
      GraphQLJSONObject: 'JSON',
      ID: 'string',
      Int: 'number',
      String: 'string',
    }

    return typeMap[graphqlType] || 'string'
  }
}

export const columnToTypes = (column: ColumnMetadata) => {
  const graphqlType = columnToGraphQLType(column)
  const tsType = columnToTypeScriptType(column)

  return { graphqlType, tsType }
}
