import names from "@/app/datas/koreanNames.json";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
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
          <InputPicker choices={["femme", "non binaire", "homme"]} />
          <Pressable>
            <ThemedButton onPress={handleSubmit} text="Générer votre nom" />
          </Pressable>
        </>
      </ThemedModal>
      {selectedName && (
        <>
          <Text>Ton nom coréen est...</Text>
          <Text>✨ {selectedName} ✨</Text>
        </>
      )}
    </>
  );
};

export default KoreanNameNative;

const styles = StyleSheet.create({});
