import { EntityMetadata } from 'typeorm/metadata/EntityMetadata'
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata'

import { niceString, indent } from '../utils'

// ORDER BY

export const entityToOrderByEnum = (entity: EntityMetadata): string => {
  let fieldsTemplate = ''

  entity.columns.forEach((column: ColumnMetadata) => {
    if (!column.isPrimary && !column.isVersion) {
      fieldsTemplate += `${column.propertyName}_ASC = '${column.propertyName}_ASC',\n`
      fieldsTemplate += `${column.propertyName}_DESC = '${column.propertyName}_DESC',\n`
    }
  })

  return niceString`
    export enum ${entity.name}OrderByEnum {
    ${indent(fieldsTemplate)}
    }

    registerEnumType(${entity.name}OrderByEnum, {
      name: '${entity.name}OrderByInput'
    })
  `
}
