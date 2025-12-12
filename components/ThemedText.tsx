import { useFont } from "@/hooks/useFont";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

interface ThemedTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  title?: boolean;
  color?: string;
}

const ThemedText: React.FC<ThemedTextProps> = ({
  style,
  title = false,
  color = "#333",
  ...props
}) => {
  const { font } = useFont(); // ✅ 괄호 수정

  return (
    <Text
      style={[
        {
          fontFamily: font,
          color,
          fontSize: title ? 23 : 14,
          fontWeight: title ? "bold" : "normal",
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedText;
