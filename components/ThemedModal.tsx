import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    View,
    ViewProps,
    ViewStyle
} from "react-native";

interface ThemedModalProps extends ViewProps {
  visible: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const ThemedModal: React.FC<ThemedModalProps> = ({
  visible,
  onDismiss,
  children,
  style,
  ...props
}) => {
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleDismiss}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, style]} {...props}>
          <Pressable onPress={handleDismiss} style={{alignSelf:"flex-end"}}>
            <Ionicons size={20} name="close-outline"/>
          </Pressable>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ThemedModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    minWidth: 300,
  },
  dismissText: {
    color: "white",
    fontWeight: "600",
  },
});
