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
  async getRecipeById(@Args('id') id: number) {
    return this._recipeService.getRecipeById(id);
  }

  @Mutation('createRecipe')
  async createRecipe(@Args('recipeData') data: CreateRecipeDto) {
    return this._recipeService.createRecipe(data);
  }
}
