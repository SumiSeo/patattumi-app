import RecetteVideo from "@/components/RecetteVideo";
import ThemedCard from "@/components/ThemedCard";
import ThemedLoader from "@/components/ThemedLoader";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { QUERY_RECIPE } from "@/queries/RecipeQuery";
import { RecipeType } from "@/types/RecipeContextType";
import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const RecipeDetail = () => {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useQuery<{ recipes_by_pk: RecipeType }>(
    QUERY_RECIPE,
    {
      variables: { id: Number(id) },
      fetchPolicy: "network-only",
    }
  );

  if (loading) return <ThemedLoader />;
  if (error) return <ThemedText>Erreur: {error.message}</ThemedText>;

  const recipeInfo = data?.recipes_by_pk;
  if (!recipeInfo) return <ThemedText>Recette non trouvée</ThemedText>;

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
              uri: `https://media.aboutsauce.com/${recipeInfo.id}.jpg?quality=100`,
            }}
            style={{
              width: 200,
              height: 150,
              borderRadius: 10,
              margin: "auto",
            }}
          />
          <ThemedText style={{ marginVertical: 15, fontSize: 18 }} title>
            {recipeInfo.name}
          </ThemedText>
          <ThemedText
            style={{ fontSize: 13, fontWeight: "bold", marginBottom: 25 }}
          >
            {recipeInfo.description}
          </ThemedText>
          {chunkRecipe(recipeInfo.recipe)}
          <View style={{ alignSelf: "flex-start" }}>
            <RecetteVideo
              youtube={recipeInfo.youtube}
              tiktok={recipeInfo.tiktok}
              insta={recipeInfo.insta}
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

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
});