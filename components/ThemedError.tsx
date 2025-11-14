import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";

interface ThemedViewProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
}

const ThemedError: React.FC<ThemedViewProps> = ({ style, ...props }) => {
  return <View style={[styles.card, style]} {...props} />;
};

export default ThemedError;

const styles = StyleSheet.create({
  card: {
    color: "red",
    borderRadius: 5,
    padding: 20,
  },
});
