import emojisHangeul from "@/app/datas/emojiHangeul.json";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ThemedQuote from "../ThemedQuote";
import ThemedText from "../ThemedText";

const KoreanEmojiNative = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  const [msg, setMsg] = useState<string>("");
  const currentEmoji = emojisHangeul[currentIndex];

  useFocusEffect(
    useCallback(() => {
      setMsg("");
      setSelectedBadge(null);
      setInputValue("");
      setCurrentIndex(0);
    }, [])
  );

  const handleNext = () => {
    if (inputValue !== currentEmoji.emoji) {
      setMsg("L'emoji saisi est incorrect. Réessayez.");
      return;
    }

    if (selectedBadge === null) {
      setMsg("Veuillez sélectionner une émotion correcte.");
      return;
    }

    if (selectedBadge === currentEmoji.correctBadge) {
      setMsg("");
    } else {
      setMsg(
        `Mauvaise réponse. La bonne réponse était: ${
          currentEmoji.badges[currentEmoji.correctBadge]
        }`
      );
    }

    if (currentIndex < emojisHangeul.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setInputValue("");
      setSelectedBadge(null);
    } else {
      setMsg("🎉 Vous avez terminé tous les emojis.");
    }
  };

  return (
    <ScrollView>
      <ThemedText title style={{ fontSize: 14, marginBottom: 10 }}>
        Devinez l&apos;émotion de l&apos;emoji ci-dessous.
      </ThemedText>
      <ThemedQuote
        header={currentEmoji.emoji}
        body={currentEmoji.description}
      />
      <View style={styles.badgeContainer}>
        {currentEmoji.badges.map((text, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedBadge(index)}
            style={[
              styles.badge,
              selectedBadge === index && styles.badgeSelected,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                selectedBadge === index && styles.badgeTextSelected,
              ]}
            >
              {text}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Tapez l'emoji ici"
        value={inputValue}
        onChangeText={setInputValue}
      />

      <Pressable style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Prochain emoji</Text>
      </Pressable>

      {msg !== "" && <Text style={styles.msg}>{msg}</Text>}
    </ScrollView>
  );
};

export default KoreanEmojiNative;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    margin: 2,
  },
  badgeSelected: {
    backgroundColor: "#000",
  },
  badgeText: {
    color: "#000",
    fontSize: 12,
  },
  badgeTextSelected: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  msg: {
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
