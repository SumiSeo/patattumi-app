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
};

export type RecipeContextType = {
  recipes: RecipeType[] | null;
  fetchRecipes: () => Promise<void>;
  fetchRecipeById: (id: number) => Promise<void>;
};

export type RecipeData = {
  id: number;
  name: string;
  description: string;
  image: string;
  youtube: string;
  insta: number;
  tiktok: string;
};

export type RecipeDatas = {
  recipes: RecipeData[];
};