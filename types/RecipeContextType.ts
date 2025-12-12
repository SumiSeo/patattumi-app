import { ReactNode } from "react";

export interface RecipeProviderProps {
  children: ReactNode;
}

export interface RecipeResponse {
  id: number;
  name: string;
  description: string;
  img: string;
  is_vegeterian: boolean;
  contains_pork: boolean;
  contains_beef: boolean;
  contains_fish: boolean;
  is_dessert: boolean;
  is_guide: boolean;
  insta: string;
  tiktok: string;
  youtube: string;
  recipe: string | null | undefined;
}

export type RecipesResponse = {
  datas: RecipeResponse[];
  count: number;
};
export type RecipeResponseList = {
  datas: RecipeResponse[];
  count: number;
} | null;

export type RecipeContextType = {
  recipes: RecipeResponseList;
  fetchRecipes: () => Promise<void>;
  fetchRecipeById: (id: number) => Promise<RecipeResponse | null>;
};


