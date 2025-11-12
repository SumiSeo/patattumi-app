import PatattumiLogo from "@/assets/images/favicon.png";
import Spacer from "@/components/Spacer";
import ThemedLogo from "@/components/ThemedLogo";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

const login = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo url={PatattumiLogo} />
      <Spacer height={20} />
      <ThemedText title={true}>Patattumi</ThemedText>
      <Spacer height={10} />
      <ThemedText >
       Votre avatar coréen vous attend !
      </ThemedText>
    </ThemedView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
