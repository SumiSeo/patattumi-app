import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useRecipe } from "@/hooks/useRecipes";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const RecipesComp = () => {
  const { recipes } = useRecipe();
  const [recipesData, setRecipesData] = useState([]);
  useEffect(() => {
    console.log(recipes);
  }, []);

  return (
    <ThemedView safe={true}>
      <ThemedText title>Recettes</ThemedText>
    </ThemedView>
  );
};

export default RecipesComp;

const styles = StyleSheet.create({});
