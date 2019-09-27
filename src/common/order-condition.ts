import { OrderByCondition } from 'typeorm'

export function getOrderByCondition(value: any): OrderByCondition {
  const [attr, direction]: [string, 'ASC' | 'DESC'] = value.toString().split('_')

  return {
    [attr]: {
      order: direction,
      nulls: direction === 'ASC' ? 'NULLS FIRST' : 'NULLS LAST',
    },
  }
}
