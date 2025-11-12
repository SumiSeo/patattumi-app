import PatattumiLogo from "@/assets/images/favicon.png";
import Spacer from "@/components/Spacer";
import ThemedLogo from "@/components/ThemedLogo";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ThemedButton from "@/components/ThmedButton";
import React from "react";
import { StyleSheet } from "react-native";
const Login = () => {
  const handleSubmit = () => {
    console.log("register form submitted");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedLogo url={PatattumiLogo} />
      <Spacer height={10} />
      <ThemedText title={true}>Patattumi</ThemedText>
      <Spacer height={10} />
      <ThemedText>Votre avatar coréen vous attend !</ThemedText>
      <Spacer height={10} />
      <ThemedButton handleSubmit={handleSubmit} text="Let's GO!" />
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
