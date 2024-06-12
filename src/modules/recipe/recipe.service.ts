import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma, PrismaPromise, Recipe } from '@prisma/client';
import { CreateRecipeDto } from 'src/modules/recipe/dto/create.recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly _prisma: PrismaService) {}

  getAllRecipes(): PrismaPromise<Recipe[]> {
    return this._prisma.recipe.findMany();
  }

  getRecipeById(id: string): PrismaPromise<Recipe> {
    return this._prisma.recipe.findUnique({
      where: { id },
      include: { ingredients: true, steps: true },
    });
  }

  createRecipe(dto: CreateRecipeDto): PrismaPromise<Recipe> {
    console.log(dto);
    const data: Prisma.RecipeCreateInput = { name: dto.name, description: dto.description };
    if (dto.ingredients?.length) {
      data['ingredients'] = {
        createMany: {
          data: dto.ingredients,
        }
      }
    }
    if (dto.steps?.length) {
      data['steps'] = {
        createMany: {
          data: dto.steps,
        }
      }
    }
    return this._prisma.recipe.create({
      data,
      include: {
        ingredients: true,
        steps: true,
      },
    });
  }

  updateRecipe(id: string, data: any) {
    return this._prisma.recipe.update({ where: { id }, data });
  }

  deleteRecipe(id: string) {
    return this._prisma.recipe.delete({ where: { id } });
  }
}
