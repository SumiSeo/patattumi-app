import names from "@/app/datas/koreanNames.json";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import InputPicker from "../Picker/InputPicker";
import ThemedModal from "../ThemedModal";
import ThemedText from "../ThemedText";
import ThemedButton from "../ThmedButton";

const characterOptions = [
  "beau",
  "mignon",
  "intelligent",
  "humoristique",
  "gentil",
  "sportif",
  "créatif",
  "calme",
  "sociable",
  "passionné",
  "mystérieux",
  "fashionable",
  "artistique",
  "sensible",
  "amateur de livres",
  "difficile",
  "dormeur",
  "comme un chien",
  "comme un chat",
  "aventurier",
  "romantique",
  "drôle",
  "timide",
  "optimiste",
  "pessimiste",
  "curieux",
  "travailleur",
  "paresseux",
];

const KoreanNameNative = () => {
  const [value, setValue] = useState<string[]>([]);
  const [sexe, setSexe] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    const filteredNames = Object.entries(names)
      .filter(([name, traits]) => sexe && traits.includes(sexe))
      .filter(([name, traits]) =>
        value.some((trait) => traits.includes(trait))
      );

    if (filteredNames.length === 0) {
      setSelectedName("일치하는 이름이 없습니다 😢");
      return;
    }

    const sortedByMatch = filteredNames.sort(
      ([nameA, traitsA], [nameB, traitsB]) => {
        const matchA = value.filter((trait) => traitsA.includes(trait)).length;
        const matchB = value.filter((trait) => traitsB.includes(trait)).length;
        return matchB - matchA;
      }
    );

    const topName = sortedByMatch[0][0];
    setSelectedName(topName);
  };

  const toggleTrait = (trait: string) => {
    if (value.includes(trait)) {
      setValue(value.filter((v) => v !== trait));
    } else {
      setValue([...value, trait]);
    }
  };

  return (
    <>
      <ThemedText style={{ marginTop: 10 }}>
        Les noms coréens peuvent s&apos;écrire en caractères chinois (hanja).
        Chaque caractère a un sens spécifique, comme « sagesse » ou « élégance
        ».
      </ThemedText>
      <ThemedText style={{ marginVertical: 10 }}>
        Le nom détermine le sens des caractères, à partir duquel on peut
        imaginer des images personnalisées.
      </ThemedText>

      <ThemedButton handleSubmit={() => setModalVisible(true)} />
      <ThemedModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <>
          <InputPicker choices={["femme", "non binaire", "homme"]} />
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Générer votre nom coréen.</Text>
          </Pressable>
        </>
      </ThemedModal>
      {selectedName && (
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Ton nom coréen est...</Text>
          <Text style={styles.resultName}>✨ {selectedName} ✨</Text>
        </View>
      )}
    </>
  );
};

export default KoreanNameNative;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
  },
  label: {
    fontWeight: "500",
    fontSize: 14,
    marginTop: 12,
    marginBottom: 6,
  },
  sexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sexButton: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    paddingVertical: 6,
    marginHorizontal: 4,
  },
  sexText: { color: "#333" },
  selectedButton: {
    backgroundColor: "#333",
  },
  selectedText: { color: "#fff", fontWeight: "600" },
  traitButton: {
    // flex: 1,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 4,
    margin: 2,
    alignItems: "center",
  },
  traitText: { color: "#333" },
  submitButton: {
    marginTop: 16,
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitText: { color: "#fff", fontWeight: "600" },
  resultCard: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  resultLabel: { fontWeight: "500", marginBottom: 6 },
  resultName: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  resultImage: { width: 100, height: 100, borderRadius: 50 },
});
