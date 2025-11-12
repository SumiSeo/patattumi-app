import patattumiLogo from "@/assets/images/favicon.png";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet } from "react-native";
import Spacer from "../Spacer";
import ThemedText from "../ThemedText";

const Splash = () => {
  return (
    <>
      <Image source={patattumiLogo} style={styles.image} />
      <ThemedText title={true}>Patattumi</ThemedText>
      <Spacer height={20} />
      <Link style={styles.skip} href="/profile">
        Skip
      </Link>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    marginBottom: 15,
    width: 60,
    height: 60,
  },
  skip: {
    textDecorationLine: "underline",
    fontSize: 10,
  },
});
