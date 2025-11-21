import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import ThemedText from "../ThemedText";

export type ChatLocationProps = {
  isFrance: boolean;
  handleChatLocation: () => void;
};
const ChatLocation = ({ isFrance, handleChatLocation }: ChatLocationProps) => {
  return (
    <Pressable
      onPress={handleChatLocation}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Ionicons size={20} name={isFrance ? "location-outline" : "location"} />
      <ThemedText title style={{ fontSize: 12 }}>
        {isFrance ? "France" : "Corée"}
      </ThemedText>
    </Pressable>
  );
};

export default ChatLocation;
