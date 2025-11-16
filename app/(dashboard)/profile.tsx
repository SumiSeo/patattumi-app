import Logout from "@/components/Profile/Logout";
import ProfileAssetCard from "@/components/Profile/ProfileAssetCard";
import UserAvatar from "@/components/Profile/UserAvatar";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
const Profile = () => {
  const profileAssets = [
    { name: "person", title: "Prénom" },
    { name: "age", title: "Âge" },
    { name: "language", title: "Langue préférée" },
    { name: "size", title: "Taille" },
    { name: "animal", title: "Animal totem" },
  ];
  const displayProfileAssets = () => {
    return profileAssets.map((asset) => {
      return (
        <ProfileAssetCard
          key={asset.name}
          name={asset.name}
          title={asset.title}
        />
      );
    });
  };
  return (
    <ThemedView safe={true}>
      <View style={styles.profileNav}>
        <ThemedText title>Profile</ThemedText>
        <Logout />
      </View>
      <UserAvatar />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          marginBottom: 5,
        }}
      >
        <ThemedText style={{ fontWeight: "bold" }}>
          Votre alter ego coréen
        </ThemedText>
        <Ionicons
          size={16}
          name="heart-half-outline"
          style={{ marginLeft: 5 }}
        />
      </View>
      {displayProfileAssets()}
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});
