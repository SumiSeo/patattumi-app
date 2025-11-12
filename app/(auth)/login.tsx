import PatattumiLogo from "@/assets/images/favicon.png";
import Spacer from "@/components/Spacer";
import ThemedLogo from "@/components/ThemedLogo";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
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
      <Pressable style={styles.button} onPress={handleSubmit}>
        <ThemedText title color="#fff" style={styles.buttonText}>
          Let&apos;s GO!
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: 120,
    paddingVertical: 12,
    cursor: "pointer",
    borderRadius: 10,
    color: "#fff",
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 14,
  },
});
