import { useLanguage } from "@/hooks/useLanguage";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../ThemedText";

const Language = () => {
  const { setLanguage } = useLanguage();

  // 언어 옵션 리스트
  const languages = [
    { code: "ko", flag: "🇰🇷" },
    { code: "fr", flag: "🇫🇷" },
    { code: "en", flag: "🇬🇧" },
  ];

  return (
    <View style={styles.container}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => setLanguage(lang.code)}
        >
          <ThemedText style={styles.flag}>{lang.flag}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  flag: {
    fontSize: 20,
  },
});
