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

interface ThemedFilterProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
  filters: string[];
}

const ThemedFilter: React.FC<ThemedFilterProps> = ({
  style,
  //   filters,
  ...props
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[] | null>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setModalVisible(true);
  };
  const filters = [
    {
      name: "vegetarian",
      icon: "leaf-outline" as const,
      value: "is_vegetarian",
    },
    {
      name: "pork",
      icon: "paw-outline" as const,
      value: "contains_pork",
    },
    {
      name: "beef",
      icon: "paw-outline" as const,
      value: "contains_beef",
    },
    {
      name: "fish",
      icon: "fish-outline" as const,
      value: "contains_fish",
    },
    {
      name: "dessert",
      icon: "cafe-outline" as const,
      value: "is_dessert",
    },
    {
      name: "guide",
      icon: "newspaper-outline" as const,
      value: "is_guide",
    },
  ];
  const createFilter = () => {
    return filters.map((filter) => {
      const isSelected = selected?.includes(filter.value); // 선택 여부 확인

      const toggleFilter = () => {
        if (!selected) return setSelected([filter.value]);
        if (isSelected) {
          setSelected(selected.filter((v) => v !== filter.value));
        } else {
          setSelected([...selected, filter.value]);
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
        <ThemedButton />
      </ThemedModal>
    </View>
  );
};

export default ThemedFilter;

const styles = StyleSheet.create({
  card: {},
});
