import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const Splash = () => {
  return (
    <>
      <Link style={styles.skip} href="/profile">
        Skip
      </Link>
      <Link style={styles.skip} href="/login">
        Login
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
