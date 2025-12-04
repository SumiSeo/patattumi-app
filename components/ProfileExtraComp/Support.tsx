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

const koreanEmergencyContacts = [
  {
    id: "1",
    label: "Suivez-moi partout ! ",
    link: ["Instagram", "Tiktok", "Youtube", "Patattumi language"],
    href: [
      "https://www.instagram.com/patattumi",
      "https://www.tiktok.com/@patattumi",
      "https://www.youtube.com/@patattumi",
      "https://www.instagram.com/patattumi_app",
    ],
    description:
      "Chaque plateforme révèle une facette différente de la culture coréenne.",
  },
  {
    id: "2",
    label: "Découvrez ma sélection sur ma boutique Amazon.",
    link: ["Patattumi Amazon Front Store"],
    href: [
      "https://www.amazon.com/shop/patattumi?ccs_id=ecebcbe6-09ba-4e01-aa60-1a6eccdd4adc",
    ],
    description:
      "Voici des produits coréens que j’utilise ou recommande. En passant par ce lien, je reçois une petite commission.",
  },
];

const Support = () => {
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
            <Ionicons name="heart-outline" size={18} />
            <ThemedText
              title
              style={{ fontSize: 14, marginVertical: 8, marginLeft: 5 }}
            >
              Rejoignez l&apos;aventure Patattumi.
            </ThemedText>
          </View>
          {koreanEmergencyContacts.map((contact, i) => (
            <ThemedView key={contact.id} style={{ marginTop: 30 }}>
              <ThemedText style={{ fontWeight: "bold", fontSize: 15 }}>
                {i + 1}. {contact.label}
              </ThemedText>
              <ThemedText
                style={{ fontSize: 16, color: "#555", marginVertical: 6 }}
              >
                {contact.description}
              </ThemedText>
              <ThemedText style={{ fontSize: 12, marginVertical: 3,fontWeight:"bold"}}>
                En cliquant sur ce lien, vous serez redirigé vers une page
                externe.
              </ThemedText>
              {contact.link.map((l, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => Linking.openURL(contact.href[index])}
                >
                  <ThemedText
                    style={{
                      color: "#007AFF",
                      marginVertical: 4,
                      fontSize: 14,
                    }}
                  >
                    • {l}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ThemedView>
          ))}
        </ScrollView>
      </ThemedModal>
    </>
  );
};

export default Support;
