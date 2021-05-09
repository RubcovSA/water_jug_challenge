import { Args, Query, Resolver } from '@nestjs/graphql'
import { PathsDto } from './dto/pathsDto'
import { PathService } from './path.service'
import { PathInputDto } from './dto/pathInputDto'

@Resolver(() => PathsDto)
export class PathResolver {
  constructor(private jugService: PathService) {}

  @Query(() => PathsDto, { nullable: true })
  async getPath(
    @Args({ name: 'pathInput', type: () => PathInputDto })
    pathInput: PathInputDto,
  ): Promise<PathsDto> {
    return {
      bestSolution: await this.jugService.findBestPath(
        pathInput.x,
        pathInput.y,
        pathInput.z,
      ),
      worstSolution: await this.jugService.findWorstPath(
        pathInput.x,
        pathInput.y,
        pathInput.z,
      ),
    }
  }
}
