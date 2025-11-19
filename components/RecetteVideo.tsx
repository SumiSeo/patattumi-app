import ThemedText from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";

type RecetteVideoProps = {
  insta: string;
  youtube: string;
  tiktok: string;
};
const RecetteVideo = ({ insta, youtube, tiktok }: RecetteVideoProps) => {
  return (
    <View style={styles.container}>
      <ThemedText
        style={{ fontSize: 13, fontWeight: "bold", marginVertical: 10 }}
      >
        Voir la vidéo de la recette.(Cette vidéo s’ouvrira dans une page
        externe.)
      </ThemedText>
      <View style={styles.box}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`https://www.youtube.com/shorts/${youtube}`)
          }
        >
          <Ionicons name="logo-youtube" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`https://www.instagram.com/reel/${insta}`)
          }
        >
          <Ionicons name="logo-instagram" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`https://www.tiktok.com/@patattumi/video/${tiktok}`)
          }
        >
          <Ionicons name="logo-tiktok" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecetteVideo;

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
