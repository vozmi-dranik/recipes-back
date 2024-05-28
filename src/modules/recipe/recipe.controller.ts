import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { RecipeService } from 'src/modules/recipe/recipe.service';
import { CreateRecipeDto } from 'src/modules/recipe/dto/create.recipe.dto';
import { Response } from 'express';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly _recipeService: RecipeService) {}

  @Get()
  getAllRecipes() {
    return this._recipeService.getAllRecipes();
  }

  @Get(':id')
  getRecipeById( @Param('id') id: number,) {
    return this._recipeService.getRecipeById(id);
  }

  @Post()
  async createRecipe(@Body() dto: CreateRecipeDto, @Res({ passthrough: true }) res: Response) {
    res
      .status(HttpStatus.CREATED)
      .send(await this._recipeService.createRecipe(dto))
  }
}
