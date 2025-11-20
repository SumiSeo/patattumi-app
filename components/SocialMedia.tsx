import ThemedText from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";

type SocialMediaProps = {
  insta?: string;
  youtube?: string;
  tiktok?: string;
  title:string;
};
const SocialMedia = ({title, insta, youtube, tiktok }: SocialMediaProps) => {
  return (
    <View style={styles.container}>
      <ThemedText
        style={{ fontSize: 13, fontWeight: "bold", marginVertical: 10 }}
      >
       {title}
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

export default SocialMedia;

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
