import { wordsData } from "@/types/KoreanClockGameType";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const KoreanWord = ({ data }: wordsData) => {
  const [showWords, setShowWords] = useState<boolean>(true);
  const [showSignications, setShowSignifications] = useState<boolean>(true);
  const handlePressWords = () => {
    setShowWords(!showWords);
  };
  const handlePressSignifications = () => {
    setShowSignifications(!showSignications);
  };

  const createWordsTable = () => {
    return data.map((word) => (
      <View
        key={word.id}
        style={{
          flexDirection: "row",
          paddingVertical: 8,
          borderBottomWidth: 0.2,
          borderColor: "black",
        }}
      >
        <Text
          style={[
            { flex: 1, color: !showWords ? "white" : "black" },
            styles.tableRow,
          ]}
        >
          {word.korean}
        </Text>
        <Text
          style={[
            { flex: 2, color: !showSignications ? "white" : "black" },
            styles.tableRow,
          ]}
        >
          {word.signification}
        </Text>
      </View>
    ));
  };

  return (
    <View style={{ margin: 10 }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          backgroundColor: "black",
          borderBottomWidth: 2,
        }}
      >
        <Pressable
          onPress={handlePressWords}
          style={[
            {
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            },
          ]}
        >
          <Ionicons
            size={14}
            name={showWords ? "eye-outline" : "eye-off-outline"}
            color="white"
          />
          <Text style={styles.tableHeader}>Mot</Text>
        </Pressable>
        <Pressable
          onPress={handlePressSignifications}
          style={[
            {
              flex: 2,
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <Ionicons
            size={14}
            name={showSignications ? "eye-outline" : "eye-off-outline"}
            color="white"
          />
          <Text style={styles.tableHeader}>Signification</Text>
        </Pressable>
      </View>

      {createWordsTable()}
    </View>
  );
};

export default KoreanWord;

const styles = StyleSheet.create({
  tableHeader: {
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
    marginLeft: 5,
  },
  tableRow: {
    fontSize: 10,
    paddingHorizontal: 2,
  },
});
