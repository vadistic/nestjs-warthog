// This file has been auto-generated by NestJS Warthog.
// Do not update directly as it will be re-written.

import { ArgsType, Field, Float, InputType, Int } from 'type-graphql'
import { registerEnumType } from 'type-graphql'
import { PaginationArgs } from 'nestjs-warthog'

export enum PostOrderByEnum {
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  text_ASC = 'text_ASC',
  text_DESC = 'text_DESC',
  likesCount_ASC = 'likesCount_ASC',
  likesCount_DESC = 'likesCount_DESC'
}

registerEnumType(PostOrderByEnum, {
  name: 'PostOrderByInput'
})

@InputType()
export class PostWhereInput {
  @Field(() => String, { nullable: true })
  id_eq?: string
  @Field(() => [String], { nullable: true })
  id_in?: string[]

  @Field({ nullable: true })
  title_eq?: string
  @Field({ nullable: true })
  title_not?: string
  @Field({ nullable: true })
  title_contains?: string
  @Field({ nullable: true })
  title_startsWith?: string
  @Field({ nullable: true })
  title_endsWith?: string
  @Field(() => [String], { nullable: true })
  title_in?: string[]

  @Field({ nullable: true })
  text_eq?: string
  @Field({ nullable: true })
  text_not?: string
  @Field({ nullable: true })
  text_contains?: string
  @Field({ nullable: true })
  text_startsWith?: string
  @Field({ nullable: true })
  text_endsWith?: string
  @Field(() => [String], { nullable: true })
  text_in?: string[]

  @Field({ nullable: true })
  likesCount_eq?: number
  @Field({ nullable: true })
  likesCount_gt?: number
  @Field({ nullable: true })
  likesCount_gte?: number
  @Field({ nullable: true })
  likesCount_lt?: number
  @Field({ nullable: true })
  likesCount_lte?: number
  @Field(() => [Float], { nullable: true })
  likesCount_in?: number[]
}

@InputType()
export class PostWhereUniqueInput {
  @Field(() => String)
  id?: string
}

@InputType()
export class PostCreateInput {
  @Field()
  title!: string
  @Field()
  text!: string
  @Field()
  likesCount!: number
}

@InputType()
export class PostUpdateInput {
  @Field({ nullable: true })
  title?: string
  @Field({ nullable: true })
  text?: string
  @Field({ nullable: true })
  likesCount?: number
}

@ArgsType()
export class PostWhereUniqueArgs {
  @Field(() => PostWhereInput)
  where!: PostWhereUniqueInput
}

@ArgsType()
export class PostWhereArgs extends PaginationArgs {
  @Field(() => PostWhereInput, { nullable: true })
  where?: PostWhereInput
  @Field(() => PostOrderByEnum, { nullable: true })
  orderBy?: PostOrderByEnum
}

@ArgsType()
export class PostCreateArgs {
  @Field(() => PostCreateInput)
  data!: PostCreateInput
}

@ArgsType()
export class PostCreateManyArgs {
  @Field(() => [PostCreateInput])
  data!: PostCreateInput[]
}

@ArgsType()
export class PostUpdateArgs {
  @Field(() => PostUpdateInput)
  data!: PostUpdateInput
  @Field(() => PostWhereUniqueInput)
  where!: PostWhereUniqueInput
}

@ArgsType()
export class PostUpdateManyArgs {
  @Field(() => PostUpdateInput)
  data!: PostUpdateInput
  @Field(() => PostWhereInput)
  where!: PostWhereInput
}

@ArgsType()
export class PostDeleteArgs {
  @Field(() => PostWhereUniqueInput)
  where!: PostWhereUniqueInput
}

@ArgsType()
export class PostDeleteManyArgs {
  @Field(() => PostWhereInput)
  where!: PostWhereInput
}
export enum PhotoOrderByEnum {
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
  post_DESC = 'post_DESC'
}

registerEnumType(PhotoOrderByEnum, {
  name: 'PhotoOrderByInput'
})

@InputType()
export class PhotoWhereInput {
  @Field(() => String, { nullable: true })
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
}

@InputType()
export class PhotoWhereUniqueInput {
  @Field(() => String)
  id?: string
}

@InputType()
export class PhotoCreateInput {
  @Field()
  name!: string
  @Field()
  description!: string
  @Field()
  filename!: string
  @Field()
  views!: number
  @Field()
  isPublished!: boolean
  @Field({ nullable: true })
  post?: string
}

@InputType()
export class PhotoUpdateInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  description?: string
  @Field({ nullable: true })
  filename?: string
  @Field({ nullable: true })
  views?: number
  @Field({ nullable: true })
  isPublished?: boolean
  @Field({ nullable: true })
  post?: string
}

@ArgsType()
export class PhotoWhereUniqueArgs {
  @Field(() => PhotoWhereInput)
  where!: PhotoWhereUniqueInput
}

@ArgsType()
export class PhotoWhereArgs extends PaginationArgs {
  @Field(() => PhotoWhereInput, { nullable: true })
  where?: PhotoWhereInput
  @Field(() => PhotoOrderByEnum, { nullable: true })
  orderBy?: PhotoOrderByEnum
}

@ArgsType()
export class PhotoCreateArgs {
  @Field(() => PhotoCreateInput)
  data!: PhotoCreateInput
}

@ArgsType()
export class PhotoCreateManyArgs {
  @Field(() => [PhotoCreateInput])
  data!: PhotoCreateInput[]
}

@ArgsType()
export class PhotoUpdateArgs {
  @Field(() => PhotoUpdateInput)
  data!: PhotoUpdateInput
  @Field(() => PhotoWhereUniqueInput)
  where!: PhotoWhereUniqueInput
}

@ArgsType()
export class PhotoUpdateManyArgs {
  @Field(() => PhotoUpdateInput)
  data!: PhotoUpdateInput
  @Field(() => PhotoWhereInput)
  where!: PhotoWhereInput
}

@ArgsType()
export class PhotoDeleteArgs {
  @Field(() => PhotoWhereUniqueInput)
  where!: PhotoWhereUniqueInput
}

@ArgsType()
export class PhotoDeleteManyArgs {
  @Field(() => PhotoWhereInput)
  where!: PhotoWhereInput
}
