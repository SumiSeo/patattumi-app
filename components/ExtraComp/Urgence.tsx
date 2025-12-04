import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import ThemedModal from "../ThemedModal";
import ThemedText from "../ThemedText";
import ThemedView from "../ThemedView";

const koreanEmergencyContacts = [
  {
    id: "Police",
    label: "Police Coréenne",
    number: "112",
    description:
      "Disponible 24h/24 en cas de crime, accident, menace, etc. Protège la vie et les biens des citoyens et maintient l’ordre social.",
  },
  {
    id: "Pompiers",
    label: "Pompiers Coréens",
    number: "119",
    description:
      "Pour les patients en urgence, transport à l’hôpital, incendie, secours et intervention en cas d’accident.",
  },
  {
    id: "Ambassade",
    label: "Ambassade de France en Corée",
    number: "+82 7 047 326 772",
    description:
      "Pour les situations d’urgence immédiates. En dehors des horaires de bureau, uniquement en cas d’urgence.",
  },
];

const Urgence = () => {
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
            <Ionicons name="call-outline" size={18} />
            <ThemedText
              title
              style={{ fontSize: 16, marginVertical: 10, marginLeft: 5 }}
            >
              Numéros d&apos;urgence en Corée du Sud
            </ThemedText>
          </View>
          {koreanEmergencyContacts.map((contact, i) => (
            <ThemedView key={contact.id} style={{ marginTop: 20 }}>
              <ThemedText style={{ fontWeight: "bold", fontSize: 15 }}>
                {i + 1}. {contact.label}
              </ThemedText>
              <ThemedText
                style={{ color: "#007AFF", marginVertical: 4, fontSize: 14 }}
              >
                {contact.number}
              </ThemedText>
              <ThemedText style={{ fontSize: 16, color: "#555", marginTop: 6 }}>
                {contact.description}
              </ThemedText>
            </ThemedView>
          ))}
        </ScrollView>
      </ThemedModal>
    </>
  );
};

export default Urgence;
