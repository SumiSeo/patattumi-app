import games from "@/app/datas/courseKoreanCulture.json";
import Spacer from "@/components/Spacer";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

const KoreanCulture = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ThemedView safe={true}>
      <ThemedText title>{t("nav.culture")}</ThemedText>
      <Spacer height={20} />
      <FlatList
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/culture/${item.id}`)}>
            <ThemedCard style={styles.card}>
              {item.type === "culture" && (
                <Ionicons size={35} name="game-controller-outline" />
              )}
              {item.type === "travel" && (
                <Ionicons size={35} name="earth-outline" />
              )}
              {item.type === "blog" && (
                <Ionicons size={35} name="glasses-outline" />
              )}
              <View style={{ marginLeft: 10 }}>
                <ThemedText title style={{ fontSize: 17, marginBottom: 4 }}>
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
