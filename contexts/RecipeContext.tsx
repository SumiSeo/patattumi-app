import { QUERY_RECIPES } from "@/queries/RecipQuery";
import { useLazyQuery } from "@apollo/client/react";
import { createContext, ReactNode, useState } from "react";
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
export const RecipeContext = createContext<RecipeContextType | null>(null);

export function RecipeProvider({ children }: RecipeProviderProps) {
  const [getRecipes] = useLazyQuery<RecipeDatas>(QUERY_RECIPES, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  async function fetchRecipes() {
    try {
      const datas = await getRecipes();
      if (!datas.data) return;
      setRecipes(datas.data.recipes);
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
  }

  async function fetchRecipeById(id: number) {}
  return (
    <RecipeContext.Provider value={{ recipes, fetchRecipes, fetchRecipeById }}>
      {children}
    </RecipeContext.Provider>
  );
}
