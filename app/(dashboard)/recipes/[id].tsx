import getRecipe from "@/app/api/recipes/getRecipe";
import SocialMedia from "@/components/SocialMedia";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { RecipeResponse } from "@/types/RecipeContextType";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const RecipeDetail = () => {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        const data = await getRecipe(Number(id));
        setRecipe(data);
      }
    };
    fetchRecipe();
  });

  const chunkRecipe = (recipe: string | null) => {
    const ingredients = recipe?.indexOf("1");
    const ingredientsTitle = "🧑🏻‍🍳 Recette & Ingredients";
    const rest = ingredients && recipe?.slice(ingredients);
    const splitted = rest ? rest.split(". ") : [];
    const formatted = splitted && splitted.map((line) => line + "\n").join("");

    return (
      <>
        <ThemedText title style={{ marginBottom: 10, fontSize: 16 }}>
          {ingredientsTitle}
        </ThemedText>
        {formatted.split("\n").map((format) => {
          if (isNaN(parseInt(format)) && format !== "")
            return <ThemedText key={format}>• {format}.</ThemedText>;
        })}
      </>
    );
  };
  return (
    <ThemedView safe={true}>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <ThemedCard style={styles.card}>
          <Image
            source={{
              uri: `https://media.aboutsauce.com/${recipe?.id}.jpg?quality=100`,
            }}
            style={{
              width: 250,
              height: 150,
              borderRadius: 10,
              margin: "auto",
            }}
          />
          <ThemedText style={{ marginVertical: 15, fontSize: 18 }} title>
            {recipe?.name.replaceAll("'", "")}
          </ThemedText>
          <ThemedText
            style={{ fontSize: 13, fontWeight: "bold", marginBottom: 25 }}
          >
            {recipe?.description.replaceAll("'", "")}
          </ThemedText>
          {recipe?.recipe && chunkRecipe(recipe?.recipe)}
          <View style={{ alignSelf: "flex-start" }}>
            <SocialMedia
              title="Voir la vidéo de la recette.(cette vidéo s'ouvrira dans une page externe)"
              youtube={recipe?.youtube}
              tiktok={recipe?.tiktok}
              insta={recipe?.insta}
            />
          </View>
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
    boxSizing: "border-box",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
});
