import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './modules/recipe/recipe.module';
import { PrismaService } from './services/prisma/prisma.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserService } from 'src/modules/user/user.service';
import { UserResolver } from './modules/user/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: true,
      introspection: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      formatError: (error) => {
        console.log(error);
        return {
          message: error.message,
          code: error.extensions?.code === 'UNAUTHENTICATED' ? HttpStatus.UNAUTHORIZED : HttpStatus.INTERNAL_SERVER_ERROR,
        };
      },
    }),
    RecipeModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService, UserResolver],
})
export class AppModule {}
