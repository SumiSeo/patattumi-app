import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
const Logout = () => {
  const { user, logout } = useUser();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Pressable onPress={handleLogout}>
      <Ionicons size={24} name="log-out-outline" />
    </Pressable>
  );
};

export default Logout;
