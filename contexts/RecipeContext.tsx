import { QUERY_RECIPES } from "@/queries/RecipQuery";
import {
  RecipeContextType,
  RecipeDatas,
  RecipeProviderProps,
  RecipeType,
} from "@/types/RecipeContextType";
import { useLazyQuery } from "@apollo/client/react";
import { createContext, useCallback, useState } from "react";
export const RecipeContext = createContext<RecipeContextType | null>(null);

export function RecipeProvider({ children }: RecipeProviderProps) {
  const [getRecipes] = useLazyQuery<RecipeDatas>(QUERY_RECIPES, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  const fetchRecipes = useCallback(async () => {
    try {
      const datas = await getRecipes();
      if (datas.data) setRecipes(datas.data.recipes);
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
  }, [getRecipes]);

  async function fetchRecipeById(id: number) {}
  return (
    <RecipeContext.Provider value={{ recipes, fetchRecipes, fetchRecipeById }}>
      {children}
    </RecipeContext.Provider>
  );
}
