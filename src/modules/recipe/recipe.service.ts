import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma, PrismaPromise, Recipe } from '@prisma/client';
import { CreateRecipeDto } from 'src/modules/recipe/dto/create.recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly _prisma: PrismaService) {}

  getAllRecipes(email: string = ''): PrismaPromise<Recipe[]> {
    return this._prisma.recipe.findMany({
      where: { watchers: { some: { email } } },
      include: { ingredients: true, steps: true, creator: true, editors: true, watchers: true },
    });
  }

  getRecipeById(id: string): PrismaPromise<Recipe> {
    return this._prisma.recipe.findUnique({
      where: { id },
      include: { ingredients: true, steps: true, creator: true, editors: true },
    })
  }

  createRecipe(dto: CreateRecipeDto, email: string): PrismaPromise<Recipe> {
    const data: Prisma.RecipeCreateInput = { name: dto.name, description: dto.description, creator: { connect: { email }} };
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
    if(email) {
      data['editors'] = {
        connect: {
          email
        }
      }
      data['watchers'] = {
        connect: {
          email
        }
      }
    }

    return this._prisma.recipe.create({
      data,
      include: {
        ingredients: true,
        steps: true,
        creator: true,
        editors: true
      },
    });
  }

  updateRecipe(id: string, data: any) {
    return this._prisma.recipe.update({ where: { id }, data });
  }

  deleteRecipe(id: string) {
    return this._prisma.recipe.delete({ where: { id } });
  }

  async addStep(recipeId: string, data: any) {
    const steps = await this._prisma.recipe.findUnique({ where: { id: recipeId } }).steps();
    return this._prisma.recipe.update({
      where: { id: recipeId }, data: { steps: { create: { ...data, sequence: steps.length  } } },
      include: { ingredients: true, steps: true, },
    })
  }

  async addIngredient(recipeId: string, data: any) {
    const ingredients = await this._prisma.recipe.findUnique({ where: { id: recipeId } }).ingredients();
    return this._prisma.recipe.update({
      where: { id: recipeId }, data: { ingredients: { create: { ...data, sequence: ingredients.length } } },
      include: { ingredients: true, steps: true, },
    })
  }

  deleteStep({ recipeId, ingredientId }: { recipeId: string, ingredientId: string }) {
    return this._prisma.recipe.update({
      where: { id: recipeId }, data: { steps: { delete: { id: ingredientId } } },
      include: { ingredients: true, steps: true, }
    })
  }

  async deleteIngredient({ recipeId, ingredientId }: { recipeId: string, ingredientId: string }) {
    return this._prisma.recipe.update({
      where: { id: recipeId }, data: { ingredients: { delete: { id: ingredientId } } },
      include: { ingredients: true, steps: true, }
    })
  }

  updateIngredients(recipeId: string, ingredients: any) {
    return this._prisma.recipe.update({
      where: { id: recipeId }, data: { ingredients: { updateMany: ingredients } },
      include: { ingredients: true, steps: true, }
    })
  }

  updateSteps(recipeId: string, steps: any) {
    return this._prisma.recipe.update({
      where: { id: recipeId }, data: { steps: { updateMany: steps } },
      include: { ingredients: true, steps: true, }
    })
  }
}
