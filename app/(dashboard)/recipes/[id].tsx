import ThemedCard from "@/components/ThemedCard";
import ThemedLoader from "@/components/ThemedLoader";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { QUERY_RECIPE } from "@/queries/RecipeQuery";
import { RecipeType } from "@/types/RecipeContextType";
import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image } from "react-native";

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

  return (
    <ThemedView safe={true}>
      <ThemedText title>Recette & Ingredients</ThemedText>
      <ThemedCard style={{margin:10, padding:10 , justifyContent:"center"}}>
        <Image
          source={{
            uri: `https://media.aboutsauce.com/${recipeInfo.id}.jpg?quality=100`,
          }}
          style={{ width:300, height: 300, borderRadius: 10 }}
        />
        <ThemedText style={{marginVertical:20}}title>{recipeInfo.name}</ThemedText>
      </ThemedCard>
    </ThemedView>
  );
};


export default RecipeDetail;
