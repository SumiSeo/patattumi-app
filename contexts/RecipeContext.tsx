import { QUERY_RECIPE, QUERY_RECIPES } from "@/queries/RecipeQuery";
import {
  RecipeByIdResponse,
  RecipeContextType,
  RecipeProviderProps,
  RecipesResponse,
  RecipeType,
} from "@/types/RecipeContextType";
import { useLazyQuery } from "@apollo/client/react";
import { createContext, useCallback, useState } from "react";

export const RecipeContext = createContext<RecipeContextType | null>(null);

export function RecipeProvider({ children }: RecipeProviderProps) {
  const [getRecipes] = useLazyQuery<RecipesResponse>(QUERY_RECIPES, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  const [getRecipe] = useLazyQuery<RecipeByIdResponse>(QUERY_RECIPE, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const fetchRecipes = useCallback(async () => {
    try {
      const datas = await getRecipes();
      if (datas.data) setRecipes(datas.data.recipes);
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
  }, [getRecipes]);

  const fetchRecipeById = useCallback(async (id: number) => {
    const res = await getRecipe({ variables: { id } });
    if (res.data?.recipes_by_pk) return res.data.recipes_by_pk;
    return null;
  }, []);

  return (
    <RecipeContext.Provider
      value={{ recipe, recipes, fetchRecipes, fetchRecipeById }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
