import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

interface ThemedButtonProps extends TextProps {
  style?: TextStyle | TextStyle[];
  text?: string;
  handleSubmit?: () => void;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  style,
  text = "Let's GO!",
  handleSubmit,
  ...props
}) => {
  return (
    <Pressable style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    paddingHorizontal: 80,
    paddingVertical: 12,
    cursor: "pointer",
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
