import patateImg from "@/assets/images/patate.jpg";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const UserAvatar = () => {
  const { user } = useUser();

  return (
    <ThemedCard style={{flexDirection:"row"}}>
      <View>
        <Image style={styles.img} source={patateImg} />
      </View>
      <View>
        <ThemedText title style={{ fontSize: 16 }}>
          {user?.name}
        </ThemedText>
        <ThemedText>{user?.email}</ThemedText>
      </View>
    </ThemedCard>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
  img: {
    width: 70,
    height: 70,
    padding:10,
    marginRight:10,
  },
});
