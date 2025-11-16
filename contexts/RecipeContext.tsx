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
  recipes_by_pk: {
    id: number;
    name: string;
    description: string;
    image: string;
    youtube: string;
    insta: number;
    tiktok: string;
  };
};

export const RecipeContext = createContext<RecipeContextType | null>(null);

export function RecipeProvider({ children }: RecipeProviderProps) {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  async function fetchRecipes() {
    try {
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
