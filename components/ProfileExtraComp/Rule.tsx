import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Linking,
    Pressable,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import ThemedModal from "../ThemedModal";
import ThemedText from "../ThemedText";
import ThemedView from "../ThemedView";

const rules = [
  {
    id: "1",
    label: "Système d'identité réelle",
    description:
      "Cet espace est ouvert à tout le monde. Cependant, pour protéger et respecter les utilisateurs, Chat Onglet applique le principe de l’utilisation de l’identité réelle.",
  },
  {
    id: "2",
    label: "Pas de fenêtre de chat privée",
    description:
      "Pour éviter tout malentendu ou incident, on ne crée pas de fenêtre de discussion privée en tête-à-tête. On pense que les conversations liées à la Corée pourront être suffisamment discutées dans Chat Onglet.",
  },
  {
    id: "3",
    label: "Suggestion de Patattumi",
    description:
      "Cet espace a été créé par PATATTUMI😉, mais il est destiné à toutes les personnes qui aiment la Corée. Si vous souhaitez me contacter, veuillez utiliser la section Contact.",
    contact: "https://patattumi.com/",
  },
];

const Rule = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpen = () => setModalVisible(true);

  return (
    <>
      <Pressable
        onPress={handleOpen}
        style={{
          minWidth: 40,
          alignItems: "flex-end",
        }}
      >
        <Ionicons size={18} name="arrow-forward-outline" />
      </Pressable>

      <ThemedModal
        style={{ marginHorizontal: 10, maxHeight: "80%" }}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <ScrollView>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="heart" size={18} />
            <ThemedText
              title
              style={{ fontSize: 14, marginVertical: 4, marginLeft: 5 }}
            >
              Merci de lire attentivement les règles.{" "}
            </ThemedText>
          </View>

          {rules.map((rule, i) => (
            <ThemedView key={rule.id} style={{ marginTop: 20 }}>
              <ThemedText style={{ fontWeight: "bold", fontSize: 15 }}>
                {i + 1}. {rule.label}
              </ThemedText>

              <ThemedText
                style={{ fontSize: 16, color: "#555", marginVertical: 6 }}
              >
                {rule.description}
              </ThemedText>

              {rule.contact && (
                <TouchableOpacity onPress={() => Linking.openURL(rule.contact)}>
                  <ThemedText
                    style={{
                      fontSize: 12,
                      marginVertical: 3,
                      fontWeight: "bold",
                    }}
                  >
                    En cliquant sur ce lien, vous serez redirigé vers une page
                    externe.
                  </ThemedText>
                  <ThemedText
                    style={{
                      color: "#007AFF",
                      marginVertical: 4,
                      fontSize: 14,
                    }}
                  >
                    Contacter Patattumi
                  </ThemedText>
                </TouchableOpacity>
              )}
            </ThemedView>
          ))}
        </ScrollView>
      </ThemedModal>
    </>
  );
};

export default Rule;
