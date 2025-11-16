import { ReactNode } from "react";

export interface RecipeProviderProps {
  children: ReactNode;
}

export type RecipeType = {
  id: number;
  name: string;
  description: string;
  image: string;
  youtube: string;
  insta: number;
  tiktok: string;
  recipe: string;
};

export type RecipeContextType = {
  recipe: RecipeType | null;
  recipes: RecipeType[];
  fetchRecipes: () => Promise<void>;
  fetchRecipeById: (id: number) => Promise<RecipeType | null>;
};

export type RecipesResponse = {
  recipes: RecipeType[];
};

export type RecipeByIdResponse = {
  recipes_by_pk: RecipeType | null;
};
