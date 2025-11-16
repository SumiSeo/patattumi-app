import Logout from "@/components/Profile/Logout";
import ProfileAssetCard from "@/components/Profile/ProfileAssetCard";
import UserAvatar from "@/components/Profile/UserAvatar";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import React from "react";
import { StyleSheet, View } from "react-native";
const Profile = () => {
  const profileAssets = [
    { name: "person", title: "Nom coréen" },
    { name: "age", title: "Âge coréen" },
    { name: "language", title: "Langue préférée" },
    { name: "size", title: "Taille coréenne" },
    { name: "animal", title: "Animal totem coréen" },
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
