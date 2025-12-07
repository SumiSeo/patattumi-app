import { RecipeResponseList } from "@/types/RecipeContextType";
import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;


const getRecipes = async (): Promise<RecipeResponseList> => {
  try {
    const response = await fetch(`${API_URL}/recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to Recipes");
    }
    const data: RecipeResponseList = await response.json();
    return data;
  } catch (error: any) {
    console.error("Recipes error:", error.message);
    throw error;
  }
};

export default getRecipes;
