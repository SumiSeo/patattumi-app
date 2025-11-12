import React from "react";
import { Image, ViewProps, ViewStyle } from "react-native";

interface ThemedViewProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
  url: string | any;
}

const ThemedLogo: React.FC<ThemedViewProps> = ({ style, url, ...props }) => {
  return <Image source={url} />;
};

export default ThemedLogo;
