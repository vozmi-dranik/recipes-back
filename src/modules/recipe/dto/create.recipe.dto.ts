export class CreateRecipeDto {
  name: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
}

export interface Ingredient {
  id: number;
  name: string;
  count: number;
  measure: string;
  recipeId?: number | null;
}

export interface Step {
  id: number;
  description: string;
  title?: string | null;
  image?: string | null;
  recipeId?: number | null;
}
