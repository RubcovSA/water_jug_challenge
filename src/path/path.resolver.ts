import { Args, Query, Resolver } from '@nestjs/graphql'
import { PathsDto } from './dto/pathsDto'
import { PathService } from './path.service'
import { PathInputDto } from './dto/pathInputDto'

@Resolver(() => PathsDto)
export class PathResolver {
  constructor(private pathService: PathService) {}

  @Query(() => PathsDto, { nullable: true })
  async getPath(
    @Args({ name: 'pathInput', type: () => PathInputDto })
    pathInput: PathInputDto,
  ): Promise<PathsDto> {
    return this.pathService.findPaths(pathInput.x, pathInput.y, pathInput.z)
  }
}
