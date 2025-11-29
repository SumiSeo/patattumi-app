import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import ThemedText from "../ThemedText";

export type ChatLocationProps = {
  location: string;
  handleChatLocation: () => void;
};

const ChatLocation = ({ location, handleChatLocation }: ChatLocationProps) => {
  const getIconName = () => {
    switch (location) {
      case "france":
        return "location-outline";
      case "korea":
        return "location";
      case "francophone":
        return "globe-outline";
      default:
        return "location-outline";
    }
  };

  const getLocationLabel = () => {
    switch (location) {
      case "france":
        return "France";
      case "korea":
        return "Corée";
      case "francophone":
        return "Francophone";
      default:
        return "";
    }
  };

  return (
    <Pressable onPress={handleChatLocation} style={styles.container}>
      <Ionicons size={20} name={getIconName()} />
      <ThemedText title style={styles.text}>
        {getLocationLabel()}
      </ThemedText>
    </Pressable>
  );
};

export default ChatLocation;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  text: {
    fontSize: 14,
    marginLeft: 2,
  },
});