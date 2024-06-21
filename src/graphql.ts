
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface RecipeInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    ingredients?: Nullable<Nullable<IngredientInput>[]>;
    steps?: Nullable<Nullable<StepInput>[]>;
}

export interface IngredientInput {
    name: string;
    count: number;
    measure: string;
}

export interface StepInput {
    description: string;
    title?: Nullable<string>;
    image?: Nullable<string>;
}

export interface RemoveIngredientInput {
    recipeId?: Nullable<string>;
    ingredientId?: Nullable<string>;
}

export interface RemoveStepInput {
    recipeId?: Nullable<string>;
    stepId?: Nullable<string>;
}

export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients?: Nullable<Nullable<Ingredient>[]>;
    steps?: Nullable<Nullable<Step>[]>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface Ingredient {
    id: string;
    name: string;
    count: number;
    measure: string;
    recipeId?: Nullable<string>;
    sequence?: Nullable<number>;
}

export interface Step {
    id: string;
    description: string;
    recipeId?: Nullable<string>;
    title?: Nullable<string>;
    image?: Nullable<string>;
    sequence?: Nullable<number>;
}

export interface IQuery {
    recipes(): Nullable<Recipe>[] | Promise<Nullable<Recipe>[]>;
    recipe(id: string): Nullable<Recipe> | Promise<Nullable<Recipe>>;
}

export interface IMutation {
    createRecipe(recipeData?: Nullable<RecipeInput>): Nullable<Recipe> | Promise<Nullable<Recipe>>;
    updateRecipe(id: string, recipeData?: Nullable<RecipeInput>): Nullable<Recipe> | Promise<Nullable<Recipe>>;
    deleteRecipe(id: string): Nullable<Recipe> | Promise<Nullable<Recipe>>;
    addStep(recipeId: string, stepData?: Nullable<StepInput>): Nullable<Recipe> | Promise<Nullable<Recipe>>;
    addIngredient(recipeId: string, ingredientData?: Nullable<IngredientInput>): Nullable<Recipe> | Promise<Nullable<Recipe>>;
    deleteStep(data?: Nullable<RemoveStepInput>): Nullable<Recipe> | Promise<Nullable<Recipe>>;
    deleteIngredient(data?: Nullable<RemoveIngredientInput>): Nullable<Recipe> | Promise<Nullable<Recipe>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
