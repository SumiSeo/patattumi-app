import names from "@/app/datas/koreanNames.json";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Spacer from "../Spacer";
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
  const [modalVisible, setModalVisible] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setSelectedName(null);
      setValue([]);
      setSexe(null);
    }, [])
  );
  const handleSubmit = () => {
    const filteredNames = Object.entries(names)
      .filter(([name, traits]) => sexe && traits.includes(sexe))
      .filter(([name, traits]) =>
        value.some((trait) => traits.includes(trait))
      );

    if (filteredNames.length === 0) {
      setSelectedName("일치하는 이름이 없습니다 😢");
      setModalVisible(false);
      return;
    }

    const sortedByMatch = filteredNames.sort(([, traitsA], [, traitsB]) => {
      const matchA = value.filter((trait) => traitsA.includes(trait)).length;
      const matchB = value.filter((trait) => traitsB.includes(trait)).length;
      return matchB - matchA;
    });

    setSelectedName(sortedByMatch[0][0]);
    setModalVisible(false);
  };

  const toggleTrait = (trait: string) => {
    if (value.includes(trait)) {
      setValue(value.filter((v) => v !== trait));
    } else {
      setValue([...value, trait]);
    }
  };

  return (
    <ScrollView>
      <ThemedText>
        Les noms coréens peuvent s&apos;écrire en caractères chinois (hanja).
        Chaque caractère a un sens spécifique, comme « sagesse » ou « élégance
        ».
      </ThemedText>
      <ThemedText style={{ marginTop: 10, marginBottom: 20 }}>
        Le nom détermine le sens des caractères, à partir duquel on peut
        imaginer des images personnalisées.
      </ThemedText>

      <ThemedButton handleSubmit={() => setModalVisible(true)} />
      <ThemedModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <View style={{ width: 300 }}>
          <Text style={{ marginBottom: 10 }}>Choisissez votre sexe :</Text>
          {["femme", "non binaire", "homme"].map((s) => (
            <Pressable
              key={s}
              onPress={() => setSexe(s)}
              style={[styles.sexeButton, sexe === s && styles.selectedButton]}
            >
              <Text style={sexe === s ? styles.selectedText : styles.sexeText}>
                {s}
              </Text>
            </Pressable>
          ))}

          <Text style={{ marginTop: 15, marginBottom: 10 }}>
            Choisissez vos caractères :
          </Text>
          <FlatList
            style={{ marginBottom: 10 }}
            data={characterOptions}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => toggleTrait(item)}
                style={[
                  styles.chip,
                  value.includes(item) && styles.chipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    value.includes(item) && styles.chipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
          <ThemedButton handleSubmit={handleSubmit} text="Confirmer" />
        </View>
      </ThemedModal>
      <Spacer height={10} />
      {selectedName && (
        <View style={{ marginTop: 20 }}>
          <ThemedText title style={{ fontSize: 16 }}>
            Votre nom coréen est... ✨ {selectedName} ✨
          </ThemedText>
        </View>
      )}
    </ScrollView>
  );
};

export default KoreanNameNative;

const styles = StyleSheet.create({
  sexeButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    margin: 2,
  },
  sexeText: {
    color: "#000",
    textAlign: "center",
  },
  selectedButton: {
    backgroundColor: "#000",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    margin: 2,
  },
  chipSelected: {
    backgroundColor: "#000",
  },
  chipText: {
    color: "#000",
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
});
