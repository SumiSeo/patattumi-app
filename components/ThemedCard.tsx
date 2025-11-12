import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";

interface ThemedViewProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
}

const ThemedCard: React.FC<ThemedViewProps> = ({ style, ...props }) => {
  return <View style={[styles.card, style]} {...props} />;
};


export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius:5,
    padding:20,
  },
});
