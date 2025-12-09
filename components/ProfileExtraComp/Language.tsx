import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedText from "../ThemedText";

const Language = () => {
  return (
    <View style={styles.container}>
      <ThemedText style={{ fontSize: 20 }}>🇰🇷</ThemedText>
      <ThemedText style={{ fontSize: 20 }}>🇫🇷</ThemedText>
      <ThemedText style={{ fontSize: 20 }}>🇬🇧</ThemedText>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    justifyContent: "space-between",
  },
});
