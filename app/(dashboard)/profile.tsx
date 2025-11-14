import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
const Profile = () => {
  const handleLogout = async () => {
    await logout();
  };

  const { user, logout } = useUser();
  return (
    <ThemedView safe={true}>
      <View style={styles.profileNav}>
        <ThemedText title>Profile</ThemedText>
        <Pressable onPress={handleLogout}>
          <Ionicons size={24} name="log-out-outline" />
        </Pressable>
      </View>
      <ThemedCard>
        <ThemedText title>{user?.email}</ThemedText>
      </ThemedCard>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileNav: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
