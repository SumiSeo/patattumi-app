import React from "react";
import { StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";

interface ThemedViewProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
  header: string;
  body?: string;
}

const ThemedQuote: React.FC<ThemedViewProps> = ({
  style,
  header,
  body,
  ...props
}) => {
  return (
    <View style={[styles.blockquote, style]}>
      <Text style={styles.emoji}>{header}</Text>
      <Text style={styles.description}>{body}</Text>
    </View>
  );
};

export default ThemedQuote;

const styles = StyleSheet.create({
  blockquote: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});
