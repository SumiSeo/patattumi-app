import Logout from "@/components/Profile/Logout";
import ProfileAssetCard from "@/components/Profile/ProfileAssetCard";
import UserAvatar from "@/components/Profile/UserAvatar";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
const Profile = () => {
  const profileAssets = [
    { name: "person", title: "Prenom", value: "koreanName", id: 4 },
    { name: "age", title: "Âge", value: "koreanAge", id: 2 },
    { name: "animal", title: "Animal totem", value: "koreanTotem", id: 1 },
    {
      name: "support",
      title: "Soutien Patattumi",
      value: "support",
      id: -3,
    },
    {
      name: "urgence",
      title: "Urgence",
      value: "urgence",
      id: -2,
    },

    {
      name: "delete",
      title: "Supprimer mon compte",
      value: "delete",
      id: -1,
    },
  ];
  const displayProfileAssets = () => {
    return profileAssets.map((asset) => {
      return (
        <ProfileAssetCard
          id={asset.id}
          key={asset.name}
          name={asset.name}
          title={asset.title}
          value={asset.value}
        />
      );
    });
  };
  return (
    <ThemedView safe={true}>
      <View style={styles.profileNav}>
        <ThemedText title>Profil</ThemedText>
        <Logout />
      </View>
      <UserAvatar />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          marginBottom: 10,
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
