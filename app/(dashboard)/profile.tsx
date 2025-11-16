import Logout from "@/components/Profile/Logout";
import UserAvatar from "@/components/Profile/UserAvatar";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { StyleSheet, View } from "react-native";
const Profile = () => {
  const { user, logout } = useUser();
  return (
    <ThemedView safe={true}>
      <View style={styles.profileNav}>
        <ThemedText title>Profile</ThemedText>
        <Logout />
      </View>
      <UserAvatar />
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
