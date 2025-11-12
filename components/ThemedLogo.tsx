import React from "react";
import { Image, StyleSheet, ViewProps, ViewStyle } from "react-native";

interface ThemedViewProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
  url: string | any;
}

const ThemedLogo: React.FC<ThemedViewProps> = ({ style, url, ...props }) => {
  return <Image style={styles.logo} source={url} />;
};

export default ThemedLogo;

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
  },
});