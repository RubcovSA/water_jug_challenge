import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PathModule } from './path/path.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: `src/schema.gql`,
    }),
    PathModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
