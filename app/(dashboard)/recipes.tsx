import Spacer from "@/components/Spacer";
import ThemedCard from "@/components/ThemedCard";
import ThemedFilter from "@/components/ThemedFilter";
import ThemedLoader from "@/components/ThemedLoader";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useRecipe } from "@/hooks/useRecipes";
import { RecipeResponse } from "@/types/RecipeContextType";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";

const filters = [
  {
    name: "vegetarian",
    icon: "leaf-outline" as const,
    value: "is_vegeterian",
  },
  {
    name: "pork",
    icon: "paw-outline" as const,
    value: "contains_pork",
  },
  {
    name: "beef",
    icon: "paw-outline" as const,
    value: "contains_beef",
  },
  {
    name: "fish",
    icon: "fish-outline" as const,
    value: "contains_fish",
  },
  {
    name: "dessert",
    icon: "cafe-outline" as const,
    value: "is_dessert",
  },
  {
    name: "guide",
    icon: "newspaper-outline" as const,
    value: "is_guide",
  },
];
const RecipesComp = () => {
  const [selected, setSelected] = useState<string[] | null>([]);
  const { recipes, fetchRecipes } = useRecipe();
  const [selectedRecipes, setSelectedRecipes] = useState<
    RecipeResponse[] | null
  >(null);
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    if (!selected || selected.length === 0) {
      setSelectedRecipes(recipes?.datas || []);
      return;
    }

   const filtered = recipes?.datas.filter((recipe) => {
     if (!selected || selected.length === 0) return true;

     return selected.some((filter) => {
       switch (filter) {
         case "is_vegeterian":
           return recipe.is_vegeterian === true;
         case "contains_pork":
           return recipe.contains_pork !== true;
         case "contains_beef":
           return recipe.contains_beef !== true;
         case "contains_fish":
           return recipe.contains_fish === true;
         case "is_dessert":
           return recipe.is_dessert === true;
         case "is_guide":
           return recipe.is_guide === true;
         default:
           return true;
       }
     });
   });

    setSelectedRecipes(filtered || []);
  }, [selected, recipes]);

  return (
    <ThemedView safe={true}>
      {recipes?.count && recipes.count > 0 ? (
        <>
          <View style={styles.profileNav}>
            <ThemedText title>{t("nav.recipes")}</ThemedText>
            <ThemedFilter
              selected={selected}
              setSelected={setSelected}
              filters={filters}
            />
          </View>
          <Spacer height={20} />
          <FlatList
            renderItem={({ item }) => (
              <Pressable onPress={() => router.push(`/recipes/${item.id}`)}>
                <ThemedCard style={styles.card}>
                  <Image
                    source={{
                      uri: `https://media.aboutsauce.com/${item.img}.jpg?quality=10`,
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
            data={selectedRecipes || []}
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
  profileNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 1,
  },
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
