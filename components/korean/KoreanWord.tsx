import { wordsData } from "@/types/KoreanClockGameType";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const KoreanWord = ({ data }: wordsData) => {
  const createWordsTable = () => {
    return data.map((word) => (
      <View
        key={word.id}
        style={{
          flexDirection: "row",
          paddingVertical: 8,
          borderBottomWidth: 0.2,
          borderColor: "black"
        }}
      >
        <Text style={[{ flex: 1 }, styles.tableRow]}>{word.korean}</Text>
        <Text style={[{ flex: 2 }, styles.tableRow]}>{word.signification}</Text>
      </View>
    ));
  };

  return (
    <View style={{ margin: 10 }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 8,
          backgroundColor: "black",
          borderBottomWidth: 2,
        }}
      >
        <Text style={[{ flex: 1 }, styles.tableHeader]}>Mot</Text>
        <Text style={[{ flex: 2 }, styles.tableHeader]}>Signification</Text>
      </View>

      {createWordsTable()}
    </View>
  );
};

export default KoreanWord;

const styles = StyleSheet.create({
  tableHeader: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
  },
  tableRow: {
    fontSize: 10,
    paddingHorizontal: 2,
  },
});
