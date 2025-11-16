import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
const ChatPlace = () => {
  const handleLogout = async () => {};

  return (
    <Pressable
      onPress={handleLogout}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <Ionicons size={24} name="location-outline" />
    </Pressable>
  );
};

export default ChatPlace;
