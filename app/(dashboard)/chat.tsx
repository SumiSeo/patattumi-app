import ChatLocation from "@/components/Chat/ChatLocation";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const Chat = () => {
  const [isFrance, setIsFrance] = useState<boolean>(true);
  const handleChatLocation = async () => {
    setIsFrance(!isFrance);
  };

  return (
    <ThemedView safe={true}>
      <View style={styles.profileNav}>
        <ThemedText title>Chat</ThemedText>
        <ChatLocation
          isFrance={isFrance}
          handleChatLocation={handleChatLocation}
        />
      </View>
      <ThemedCard style={styles.card}>
        <View style={styles.cardBox}>
          <ThemedText style={{ fontSize: 12 }}>
            {/* {selectedData?.course} */}handleChatLocation
          </ThemedText>
          <ThemedText style={{ fontSize: 10 }}>
            {/* {selectedData?.title} */}hi
          </ThemedText>
        </View>
      </ThemedCard>
    </ThemedView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  profileNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  card: {
    margin: 10,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginVertical: 20,
    boxSizing: "border-box",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  cardBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
