import splashImg from "@/assets/images/favicon.png";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={splashImg}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.text}>Cofee Shop</Text>
      </ImageBackground>
    </View>
  );
};

export default app;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "red",
  },
});
