import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Pressable,
    StyleSheet,
    View,
    ViewProps,
    ViewStyle,
} from "react-native";
import ThemedModal from "./ThemedModal";
import ThemedText from "./ThemedText";

interface ThemedViewProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
}

const ThemedFilter: React.FC<ThemedViewProps> = ({ style, ...props }) => {
    const {t} = useTranslation()
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setModalVisible(true);
  };

  return (
    <View style={[styles.card, style]} {...props}>
      <Pressable onPress={handleOpen}>
        <Ionicons size={24} name="filter-outline" />
      </Pressable>
      <ThemedModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <ThemedText style={{fontSize:18}} title>{t("nav.filter")}</ThemedText>
      </ThemedModal>
    </View>
  );
};

export default ThemedFilter;

const styles = StyleSheet.create({
  card: {},
});
