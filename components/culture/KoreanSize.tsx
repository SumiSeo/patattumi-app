import {
  calcSizeJean,
  calcSizeLabel,
  calcSizeNumber,
  calcSizeShoes,
} from "@/utils/games/calcSizeKorean";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ThemedButton from "../ThemedButton";
import ThemedText from "../ThemedText";

const chipStyle = (selected: boolean) => ({
  paddingVertical: 4,
  paddingHorizontal: 6,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: selected ? "#fff" : "black",
  backgroundColor: selected ? "black" : "#fff",
  margin: 2,
});

const KoreanSize = () => {
  const [taille, setTaille] = useState<string | null>(null);
  const [tailleLabel, setTailleLabel] = useState<string | null>(null);
  const [tailleJean, setTailleJean] = useState<string | null>(null);
  const [shoes, setShoes] = useState<string | null>(null);

  const [convertedTaille, setConvertedTaille] = useState<string>("");
  const [convertedLabel, setConvertedLabel] = useState<string>("");
  const [convertedJean, setConvertedJean] = useState<string>("");
  const [convertedShoes, setConvertedShoes] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      setTaille(null);
      setTailleLabel(null);
      setTailleJean(null);
      setShoes(null);
      setConvertedTaille("");
      setConvertedLabel("");
      setConvertedJean("");
      setConvertedShoes("");
    }, [])
  );

  const handleSize = () => {
    if (taille) setConvertedTaille(calcSizeNumber(taille));
    if (tailleLabel) setConvertedLabel(calcSizeLabel(tailleLabel));
    if (tailleJean) setConvertedJean(calcSizeJean(tailleJean));
    if (shoes) setConvertedShoes(calcSizeShoes(shoes));
  };

  const fields = [
    {
      label: "👚 Vêtement (numérique)",
      choices: [
        "Aucune",
        "32",
        "34",
        "36",
        "38",
        "40",
        "42",
        "44",
        "46",
        "48",
        "50",
        "52",
      ],
      value: taille,
      setter: setTaille,
    },
    {
      label: "👗 Vêtement (label)",
      choices: ["Aucune", "XXS", "XS", "S", "M", "L", "XL", "XXL"],
      value: tailleLabel,
      setter: setTailleLabel,
    },
    {
      label: "👖 Pantalon",
      choices: ["Aucune", "32", "34", "36", "38", "40", "42", "44", "46", "48"],
      value: tailleJean,
      setter: setTailleJean,
    },
    {
      label: "👠 Chaussure",
      choices: [
        "Aucune",
        "34",
        "34.5",
        "35",
        "35.5",
        "36",
        "36.5",
        "37",
        "37.5",
        "38",
        "38.5",
        "39",
        "39.5",
        "40",
        "40.5",
        "41",
        "41.5",
        "42",
      ],
      value: shoes,
      setter: setShoes,
    },
  ];

  return (
    <ScrollView>
      <ThemedText style={{ fontSize: 14, marginVertical: 20 }}>
        Vérifiez votre taille coréenne avant de faire du shopping. Mais il peut
        varier selon la marque.
      </ThemedText>

      {fields.map((f) => (
        <View key={f.label} style={{ marginBottom: 16 }}>
          <ThemedText title style={{ fontSize: 12, marginBottom: 5 }}>
            {f.label}
          </ThemedText>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {f.choices.map((choice) => (
              <TouchableOpacity
                key={choice}
                style={chipStyle(f.value === choice)}
                onPress={() => f.setter(choice)}
              >
                <Text
                  style={{
                    color: f.value === choice ? "#fff" : "#000",
                    fontSize: 10,
                  }}
                >
                  {choice}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <ThemedButton text="Confirmer" handleSubmit={handleSize} />

      <View style={styles.card}>
        <ThemedText title style={{ fontSize: 16, marginBottom: 5 }}>
          Votre taille est...
        </ThemedText>
        {convertedTaille !== "" && (
          <Text>
            • Votre taille 🇫🇷 {taille} correspond à {convertedTaille} 🇰🇷
          </Text>
        )}
        {convertedLabel !== "" && (
          <Text>
            • Votre taille 🇫🇷 {tailleLabel} correspond à {convertedLabel} 🇰🇷
          </Text>
        )}
        {convertedJean !== "" && (
          <Text>
            • Votre taille de pantalon 🇫🇷 {tailleJean} correspond à{" "}
            {convertedJean} 🇰🇷
          </Text>
        )}
        {convertedShoes !== "" && (
          <Text>
            • Votre taille de chaussures 🇫🇷 {shoes} correspond à{" "}
            {convertedShoes} 🇰🇷
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default KoreanSize;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
    marginTop: 16,
  },
});
