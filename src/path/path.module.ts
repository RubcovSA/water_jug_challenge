import { Logger, Module } from '@nestjs/common'
import { PathService } from './path.service'
import { PathResolver } from './path.resolver'

@Module({
  providers: [PathResolver, PathService, Logger],
  exports: [PathService],
})
export class PathModule {}
