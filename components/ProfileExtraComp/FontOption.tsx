import { useFont } from "@/hooks/useFont";
import { useLanguage } from "@/hooks/useLanguage";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const FontOption = () => {
  const { isReady, setFont } = useFont();
  const { setLanguage } = useLanguage();

  const changeFontAndLanguage = (fontName: string, lang: string) => {
    setFont(fontName);
    setLanguage(lang);
  };

  return (
    <View>
      {isReady && (
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable onPress={() => changeFontAndLanguage("default", "ko")}>
            <Text
              style={[styles.fontText, { fontFamily: "default", fontSize: 14 }]}
            >
              가
            </Text>
          </Pressable>
          <Pressable onPress={() => changeFontAndLanguage("cuteFont", "ko")}>
            <Text
              style={[
                styles.fontText,
                { fontFamily: "cuteFont", fontSize: 13 },
              ]}
            >
              가
            </Text>
          </Pressable>
          <Pressable
            onPress={() => changeFontAndLanguage("traditionalFont", "ko")}
          >
            <Text
              style={[
                styles.fontText,
                { fontFamily: "traditionalFont", fontSize: 16 },
              ]}
            >
              가
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default FontOption;

const styles = StyleSheet.create({
  fontText: {
    fontSize: 16,
  },
});
