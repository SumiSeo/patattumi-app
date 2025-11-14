import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { StyleSheet } from "react-native";
const Profile = () => {
  const { user } = useUser();
  return (
    <ThemedView safe={true}>
      <ThemedText title>Profile</ThemedText>
      <ThemedCard>
        <ThemedText title>{user?.email}</ThemedText>
      </ThemedCard>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
