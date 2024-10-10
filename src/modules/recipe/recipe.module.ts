import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { RecipeResolver } from './recipe.resolver';
import { UserService } from 'src/modules/user/user.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, PrismaService, RecipeResolver, UserService]
})
export class RecipeModule {}
