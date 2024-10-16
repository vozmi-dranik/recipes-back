import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { RecipeService } from 'src/modules/recipe/recipe.service';
import { CreateRecipeDto } from 'src/modules/recipe/dto/create.recipe.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class RecipeResolver {
  constructor(private readonly _recipeService: RecipeService) {}

  @Query('recipes')
  @UseGuards(AuthGuard)
  async getAllRecipes(@Context() context) {
    const email = context.req.user?.email;
    return this._recipeService.getAllRecipes(email);
  }

  @Query('recipe')
  @UseGuards(AuthGuard)
  async getRecipeById(@Args('id') id: string, @Context() context) {
    const userEmail = context.req.user?.email;
    return this._recipeService.getRecipeById(id)
      .then((recipe) => {
      recipe['editable'] = recipe?.['editors'].some((editor) => editor['email'] === userEmail);
      return recipe;
    });
  }

  @Mutation('createRecipe')
  @UseGuards(AuthGuard)
  async createRecipe(@Args('recipeData') data: CreateRecipeDto, @Context() context) {
    const userEmail = context.req.user?.email;
    console.log(userEmail, 'context');
    return this._recipeService.createRecipe(data, userEmail);
  }

  @Mutation('updateRecipe')
  async updateRecipe(@Args('id') id: string, @Args('recipeData') data: any) {
    return this._recipeService.updateRecipe(id, data);
  }

  @Mutation('deleteRecipe')
  async deleteRecipe(@Args('id') id: string) {
    return this._recipeService.deleteRecipe(id);
  }

  @Mutation('addStep')
  async addStep(@Args('recipeId') recipeId: string, @Args('stepData') data: any) {
    return this._recipeService.addStep(recipeId, data);
  }

  @Mutation('addIngredient')
  async addIngredient(@Args('recipeId') recipeId: string, @Args('ingredientData') data: any) {
    return this._recipeService.addIngredient(recipeId, data);
  }

  @Mutation('deleteStep')
  async deleteStep(@Args('data') data: { recipeId: string, ingredientId: string }) {
    return this._recipeService.deleteStep(data);
  }

  @Mutation('deleteIngredient')
  async deleteIngredient(@Args('data',) data: { recipeId: string, ingredientId: string }) {
    return this._recipeService.deleteIngredient(data);
  }
}
