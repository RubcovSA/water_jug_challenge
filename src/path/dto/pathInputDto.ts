import { Field, InputType, Int } from '@nestjs/graphql'

@InputType('PathInput')
export class PathInputDto {
  @Field(() => Int)
  x: number
  @Field(() => Int)
  y: number
  @Field(() => Int)
  z: number
}
