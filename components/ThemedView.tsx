import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";

interface ThemedViewProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
}

const ThemedView: React.FC<ThemedViewProps> = ({ style, ...props }) => {
  return <View style={[styles.container, style]} {...props} />;
};


export default ThemedView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});
