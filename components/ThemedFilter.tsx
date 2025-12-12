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
import Spacer from "./Spacer";
import ThemedButton from "./ThemedButton";
import ThemedModal from "./ThemedModal";
import ThemedText from "./ThemedText";

type Filter = {
  name: string;
  icon:
    | "leaf-outline"
    | "paw-outline"
    | "fish-outline"
    | "cafe-outline"
    | "newspaper-outline";
  value: string;
};
interface ThemedFilterProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
  filters: Filter[];
  selected: string[] | null;
  setSelected: (filters: string[]) => void;
}

const ThemedFilter: React.FC<ThemedFilterProps> = ({
  style,
  filters,
  selected,
  setSelected,
  ...props
}) => {
  const { t } = useTranslation();
  const [tempSelected, setTempSelected] = useState<string[]>(selected || []);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setModalVisible(true);
  };

  const handleSelected = () => {
    setSelected(tempSelected);
    setModalVisible(false);
  };
  const createFilter = () => {
    return filters.map((filter) => {
      const isSelected = tempSelected.includes(filter.value);

      const toggleFilter = () => {
        if (isSelected) {
          setTempSelected(tempSelected.filter((v) => v !== filter.value));
        } else {
          setTempSelected([...tempSelected, filter.value]);
        }
      };
      return (
        <Pressable key={filter.value} onPress={toggleFilter}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                size={18}
                name={filter.icon}
                style={{ marginRight: 8 }}
              />
              <ThemedText>{t(`filter.${filter.name}`)}</ThemedText>
            </View>
            <Ionicons
              size={21}
              name={isSelected ? "checkmark-circle-outline" : "ellipse-outline"}
            />
          </View>
          <Spacer height={8} />
        </Pressable>
      );
    });
  };
  return (
    <View style={[styles.card, style]} {...props}>
      <Pressable onPress={handleOpen}>
        <Ionicons size={24} name="options-outline" />
      </Pressable>
      <ThemedModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <ThemedText style={{ fontSize: 16 }} title>
          {t("nav.filter")}
        </ThemedText>
        <Spacer height={20} />
        {createFilter()}
        <Spacer height={20} />
        <ThemedButton text={t("filter.button")} handleSubmit={handleSelected} />
      </ThemedModal>
    </View>
  );
};

export default ThemedFilter;

const styles = StyleSheet.create({
  card: {},
});
