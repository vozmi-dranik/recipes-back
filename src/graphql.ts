
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients?: Nullable<Nullable<Ingredient>[]>;
    steps?: Nullable<Nullable<Step>[]>;
}

export interface Ingredient {
    id: string;
    name: string;
    count: number;
    measure: string;
    recipeId?: Nullable<string>;
}

export interface Step {
    id: string;
    description: string;
    recipeId?: Nullable<string>;
    title?: Nullable<string>;
    image?: Nullable<string>;
}

export interface IQuery {
    recipes(): Nullable<Recipe>[] | Promise<Nullable<Recipe>[]>;
    recipe(id: string): Nullable<Recipe> | Promise<Nullable<Recipe>>;
}

export interface IMutation {
    createRecipe(name: string, description: string): Nullable<Recipe> | Promise<Nullable<Recipe>>;
}

type Nullable<T> = T | null;
