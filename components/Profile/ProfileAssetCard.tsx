import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "../ThemedText";

type ProfileAssetCardProps = {
  name: string;
  title: string;
};
const ProfileAssetCard = ({ name, title }: ProfileAssetCardProps) => {
  const iconsMap = {
    person: "person-outline",
    size: "shirt-outline",
    age: "hourglass-outline",
    language: "globe-outline",
    animal: "bug-outline",
  } as const;

  type IconName = keyof typeof iconsMap;

  return (
    <Pressable>
      <View style={styles.card}>
        <Ionicons
          style={styles.icon}
          size={18}
          name={iconsMap[name as IconName]}
        />
        <ThemedText style={{ fontSize: 14 }}>{title}</ThemedText>
      </View>
    </Pressable>
  );
};

export default ProfileAssetCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  icon: {
    marginRight: 10,
  },
});
