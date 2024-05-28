import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { RecipeResolver } from './recipe.resolver';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, PrismaService, RecipeResolver]
})
export class RecipeModule {}
