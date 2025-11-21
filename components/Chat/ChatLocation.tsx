import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable } from "react-native";
import ThemedText from "../ThemedText";

const ChatLocation = () => {
  const [isFrance, setIsFrance] =useState<boolean>(true)
  const handleChatLocation = async () => {
    setIsFrance(!isFrance)
  };

  return (
    <Pressable
      onPress={handleChatLocation}
      style={{  alignItems: "center", justifyContent:"center"}}
    >
      <Ionicons size={20} name={isFrance ? "location-outline" : "location"} />
      <ThemedText title style={{fontSize:12}}>{isFrance ? "France" : "Corée"}</ThemedText>
    </Pressable>
  );
};

export default ChatLocation;
