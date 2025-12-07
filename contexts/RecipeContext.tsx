import getRecipe from "@/app/api/recipes/getRecipe";
import getRecipes from "@/app/api/recipes/getRecipes";
import {
  RecipeContextType,
  RecipeProviderProps,
  RecipeResponseList,
} from "@/types/RecipeContextType";
import { createContext, useCallback, useState } from "react";

export const RecipeContext = createContext<RecipeContextType | null>(null);

export function RecipeProvider({ children }: RecipeProviderProps) {
  const [recipes, setRecipes] = useState<RecipeResponseList | null>(null);
  const fetchRecipes = useCallback(async () => {
    try {
      const result = await getRecipes();
      if (result?.datas)
        setRecipes({ datas: result?.datas, count: result.count });
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
  }, [getRecipes]);

  const fetchRecipeById = useCallback(async (id: number) => {
    const res = await getRecipe(id);
    if (res) return res;
    return null;
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes, fetchRecipes, fetchRecipeById }}>
      {children}
    </RecipeContext.Provider>
  );
}
