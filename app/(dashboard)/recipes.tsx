import Spacer from "@/components/Spacer";
import ThemedCard from "@/components/ThemedCard";
import ThemedLoader from "@/components/ThemedLoader";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useRecipe } from "@/hooks/useRecipes";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";

const RecipesComp = () => {
  const { recipes, fetchRecipes } = useRecipe();
  const router = useRouter();
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);
  return (
    <ThemedView safe={true}>
      {recipes?.count && recipes.count > 0 ? (
        <>
          <ThemedText title>Recettes</ThemedText>
          <Spacer height={20} />
          <FlatList
            renderItem={({ item }) => (
              <Pressable onPress={() => router.push(`/recipes/${item.id}`)}>
                <ThemedCard style={styles.card}>
                  <Image
                    source={{
                      uri: `https://media.aboutsauce.com/${item.id}.jpg?quality=10`,
                    }}
                    style={{ width: 60, height: 60, borderRadius: 10 }}
                  />
                  <View>
                    <ThemedText title style={{ fontSize: 16, marginBottom: 4 }}>
                      {item.name.length < 25
                        ? item.name.replaceAll("'", "")
                        : item.name.replaceAll("'", "").slice(0, 24) + "..."}
                    </ThemedText>
                    <ThemedText
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{ width: 250, fontSize: 12 }}
                    >
                      {item.description.replaceAll("'", "")}
                    </ThemedText>
                  </View>
                </ThemedCard>
              </Pressable>
            )}
            contentContainerStyle={styles.list}
            data={recipes.datas}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      ) : (
        <ThemedLoader />
      )}
    </ThemedView>
  );
};

export default RecipesComp;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "white",
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
    height: 100,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,

    // layout
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
