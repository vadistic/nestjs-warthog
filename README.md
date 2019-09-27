# nestjs-warthog

> NestJS module to generate (scalar) type-graphql inputs from typeORM entities. Based on [`warthog`](https://github.com/goldcaddy77/warthog/)

## Why

Proof of concept. I wanted to generate crud input/arguments for various scalar fields.

Props:

- Works and passes tests
- Offers warthog functionality I wanted form warthog

Cons:

- Does not support relations - only scalar fields (it's doable with doubled/tripled complexity but the idea is to expose public API and controlling cascaded operations seems really infeasible )
- Inputs are based on entity not a public model (problem with e.g. sort users by password field)

## Usage

Check out tests to see it in action!

### As NestJS module

Code will be generated on NestJS start in dev mode. (same as `@nestjs/graphql`)

```ts
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...typeOrmOptions, entities: [Photo, Post] }),
    WarthogModule.forRoot({
      path: path.join(process.cwd(), 'src/generated/warthog.ts'),
      shouldSkipPrettier: false,
      disabled: false,
    }),
    PhotoModule,
    PostModule,
  ],
})
export class AppModule {}
```

### As standalone factory

```ts
const codegen = async () => {
  export const options: WarthogModuleOptions = {
    path: './generated/warthog.ts',
    shouldSkipPrettier: false,
    disabled: false,
  }

  ctn = await createConnection({
    ...(typeOrmOptions as ConnectionOptions),
    entities: [Photo, Post],
  })

  const definitions = await generate(ctn.entityMetadatas, options)

  // file will be saved - pass disabled: true to only get schema string
  console.log(definitions)
}

codegen()
```

### With TypeOrm

Use `getfindOperator()` and `getOrderByCondition()` to transform where/ orderBy to typeorm `FindConditions`
