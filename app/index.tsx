import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Splash from "../components/Landing/Splash";

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);

  return <View style={styles.container}>{showSplash && <Splash />}</View>;
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
