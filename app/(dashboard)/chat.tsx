import ChatPlace from "@/components/Chat/ChatPlace";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import React from "react";
import { StyleSheet, View } from "react-native";

const chat = () => {
  return (
    <ThemedView safe={true}>
      <View style={styles.profileNav}>
        <ThemedText title>Chat</ThemedText>
        <ChatPlace />
      </View>
    </ThemedView>
  );
};

export default chat;

const styles = StyleSheet.create({
  profileNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});
