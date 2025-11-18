import Spacer from "@/components/Spacer";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

const games = [
  {
    id: 1,
    course: "Cours de culture 01.",
    title: "Découvir animal totem selon votre année de naissance.",
    description:
      "En Corée, selon l'année de naissance, chaque personne estassociée à un des 12 animaux du zodiaque chinois.",
  },
  {
    id: 2,
    course: "Cours de culture 02.",
    title:
      "Vous saviez que l'âge coréen se calcule différemment de l'âge français ?",
    description: "Découvrez votre âge coréen en un clin d'œil !",
  },
  {
    id: 3,
    course: "Cours de culture 03.",
    title: "Apprenez les bonnes manières coréennes avec ce jeu interactif.",
    description:
      "Découvrez les usages et règles de politesse en Corée tout en jouant !",
  },
  {
    id: 4,
    course: "Cours de culture 04.",
    title: "Créez votre nom coréen personnalisé facilement.",
    description:
      "Plus de noms coréens bizarres 😳 Générez un nom coréen selon vos préférences.",
  },
  {
    id: 5,
    course: "Cours de culture 05.",
    title: "Créez facilement des émoticons amusants en Hangeul.",
    description:
      "Inventez vos propres émoticons en coréen et amusez-vous à communiquer avec les Coréens !",
  },
  {
    id: 6,
    course: "Cours de culture 06.",
    title: "Calculez votre anniversaire en fonction du calendrier lunaire.",
    description:
      "En Corée, on calcule son anniversaire selon le calendrier lunaire 🌙",
  },
];

const KoreanCulture = () => {
  const router = useRouter();

  return (
    <ThemedView safe={true}>
      <ThemedText title>Culture & Voyage</ThemedText>
      <Spacer height={20} />
      <FlatList
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/recipes/${item.id}`)}>
            <ThemedCard style={styles.card}>
              <Ionicons size={35} name="game-controller-outline" />
              <View style={{ marginLeft: 10 }}>
                <ThemedText title style={{ fontSize: 15, marginBottom: 4 }}>
                  {item.course}
                </ThemedText>
                <ThemedText
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    width: 220,
                    fontSize: 14,
                    marginTop: 2,
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </ThemedText>
              </View>
            </ThemedCard>
          </Pressable>
        )}
        contentContainerStyle={styles.list}
        data={games}
        keyExtractor={(item) => item.id.toString()}
      />
    </ThemedView>
  );
};

export default KoreanCulture;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "white",
  },
  card: {
    paddingVertical: 30,
    paddingHorizontal: 20,
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
