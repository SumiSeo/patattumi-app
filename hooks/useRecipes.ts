import { RecipeContext } from "@/contexts/RecipeContext";
import { useContext } from "react";

export function useRecipe (){
    const context = useContext(RecipeContext)
    if(!context)
        throw new Error("userRecipe must be used withina RecipeProvider");
    return context;
}