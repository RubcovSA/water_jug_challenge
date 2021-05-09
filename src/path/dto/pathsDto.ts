import { Field, ObjectType } from '@nestjs/graphql'
import { PathItemDto } from './pathItemDto'

@ObjectType('Paths')
export class PathsDto {
  @Field(() => [PathItemDto], { nullable: true })
  bestSolution: PathItemDto[]
  @Field(() => [PathItemDto], { nullable: true })
  worstSolution: PathItemDto[]
}
