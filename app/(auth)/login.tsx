import PatattumiLogo from "@/assets/images/favicon.png";
import AppleLogin from "@/components/Auth/AppleLogin";
import Spacer from "@/components/Spacer";
import ThemedLogo from "@/components/ThemedLogo";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";
const Login = () => {
  const handleSubmit = () => {
    console.log("register form submitted");
  };

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedLogo url={PatattumiLogo} />
      <Spacer height={10} />
      <ThemedText title={true}>Patattumi</ThemedText>
      <Spacer height={10} />
      <ThemedText>Votre avatar coréen vous attend !</ThemedText>
      <Spacer height={10} />
      <AppleLogin />
      {/* <ThemedButton handleSubmit={handleSubmit} /> */}
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
