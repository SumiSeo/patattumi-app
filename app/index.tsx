import { Image , StyleSheet, Text, View } from 'react-native';
import React from "react";
import patattumiLogo from "../assets/images/favicon.png"

const Home = () => {
  return (
    <View style={styles.container}>
    <Image source={patattumiLogo} style={styles.image}/>
      <Text style={styles.title}>Patattumi</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  image:{
    marginVertical:15,
    width:60,
    height:60,
  },
  title: {
    color: "black",
    fontSize:25,
    fontWeight:"bold"
  },
});
