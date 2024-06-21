import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RecipeService } from 'src/modules/recipe/recipe.service';
import { CreateRecipeDto } from 'src/modules/recipe/dto/create.recipe.dto';


@Resolver()
export class RecipeResolver {
  constructor(private readonly _recipeService: RecipeService) {}

  @Query('recipes')
  async getAllRecipes() {
    return this._recipeService.getAllRecipes();
  }

  @Query('recipe')
  async getRecipeById(@Args('id') id: string) {
    return this._recipeService.getRecipeById(id);
  }

  @Mutation('createRecipe')
  async createRecipe(@Args('recipeData') data: CreateRecipeDto) {
    return this._recipeService.createRecipe(data);
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
