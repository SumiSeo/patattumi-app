import React from "react";
import { View } from "react-native";
import ThemedText from "../ThemedText";
const KoreanName = () => {
  return (
    <View>
      <ThemedText style={{ marginTop: 10 }}>
        Les noms coréens peuvent s&apos;écrire en caractères chinois (hanja).
        Chaque caractère a un sens spécifique, comme « sagesse » ou « élégance
        ».
      </ThemedText>
      <ThemedText style={{ marginTop: 5 }}>
        Le nom détermine le sens des caractères, à partir duquel on peut
        imaginer des images personnalisées.
      </ThemedText>
    </View>
  );
};

export default KoreanName;
