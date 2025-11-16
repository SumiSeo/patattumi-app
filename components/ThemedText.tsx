import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

interface ThemedTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  title?: boolean;
  color?: string;
}

const ThemedText: React.FC<ThemedTextProps> = ({
  style,
  title = false,
  color = "#333",
  ...props
}) => {
  return (
    <Text
      style={[
        {
          color,
          fontSize: title ? 24 : 14,
          fontWeight: title ? "bold" : "normal",
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedText;
