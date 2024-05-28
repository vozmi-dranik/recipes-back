import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, PrismaService]
})
export class RecipeModule {}
