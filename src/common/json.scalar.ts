import { Kind, ValueNode, GraphQLScalarType } from 'graphql'

// copy-paste because it's tiny & missed typings
// https://github.com/taion/graphql-type-json/blob/master/src/index.js

const identity = <T>(value: T) => {
  return value
}

const ensureObject = <T>(value: T) => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(`JSONObject cannot represent non-object value: ${value}`)
  }

  return value
}

const parseObject = (ast: ValueNode, variables: any) => {
  if (ast.kind !== Kind.OBJECT)
    throw new TypeError(`JSONObject cannot represent non-object ast: ${ast}`)

  const value = Object.create(null)

  ast.fields.forEach(field => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    value[field.name.value] = parseLiteral(field.value, variables)
  })

  return value
}

const parseLiteral = (ast: ValueNode, variables: any): any => {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value)
    case Kind.OBJECT:
      return parseObject(ast, variables)
    case Kind.LIST:
      return ast.values.map(n => parseLiteral(n, variables))
    case Kind.NULL:
      return null
    case Kind.VARIABLE: {
      const name = ast.name.value
      return variables ? variables[name] : undefined
    }
    default:
      return undefined
  }
}

export const GraphQLJSON = new GraphQLScalarType({
  name: 'JSON',
  description:
    'The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
  serialize: identity,
  parseValue: identity,
  parseLiteral,
})

export const GraphQLJSONObject = new GraphQLScalarType({
  name: 'JSONObject',
  description:
    'The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
  serialize: ensureObject,
  parseValue: ensureObject,
  parseLiteral: parseObject,
})
