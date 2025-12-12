import { useLanguage } from "@/hooks/useLanguage";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const FontOption = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        cuteFont: require("../../assets/fonts/ChangwonDangamRound.otf"),
        traditionalFont: require("../../assets/fonts/Shilla_Culture(M).otf"),
      });
      setIsReady(true);
    };

    loadFonts();
  }, []);

  const { setLanguage } = useLanguage();

  // 언어 옵션 리스트
  const languages = [
    { code: "ko", flag: "🇰🇷" },
    { code: "fr", flag: "🇫🇷" },
    { code: "en", flag: "🇬🇧" },
  ];

  return (
    <View>
      {/* {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => setLanguage(lang.code)}
        >
          <ThemedText style={styles.flag}>{lang.flag}</ThemedText>
        </TouchableOpacity>
      ))} */}
      {isReady && (
        <View>
          <Text style={{ fontFamily: "cuteFont" }}>안녕</Text>
        </View>
      )}
    </View>
  );
};

export default FontOption;


