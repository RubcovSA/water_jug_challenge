import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType('PathItem')
export class PathItemDto {
  @Field(() => Int)
  x: number
  @Field(() => Int)
  y: number
  @Field()
  description: string
}
