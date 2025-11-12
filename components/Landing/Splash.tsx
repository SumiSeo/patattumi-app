import patattumiLogo from "@/assets/images/favicon.png";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import Spacer from "../Spacer";

const Splash = () => {
  return (
    <>
      <Image source={patattumiLogo} style={styles.image} />
      <Text style={styles.title}>Patattumi</Text>
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
  title: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
  },
  skip: {
    textDecorationLine: "underline",
    fontSize: 10,
  },
});
