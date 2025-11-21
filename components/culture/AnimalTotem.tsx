import { calculate12God } from "@/utils/games/calcAnimalTotem";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import ThemedDateTimePicker from "../DateTime/ThemedDateTimePicker";
import Spacer from "../Spacer";
import ThemedModal from "../ThemedModal";
import ThemedText from "../ThemedText";
import ThemedButton from "../ThmedButton";

const AnimalTotem = () => {
  const [confirmDate, setConfirmDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setConfirmDate(null);
    }, [])
  );

  const handleSubmit = () => {
    setOpen(true);
    setModalVisible(true);
  };

  const displayTotemExplain = () => {
    const year = confirmDate?.getFullYear();
    if (year) {
      const character = calculate12God(year);
      if (!character) return null;

      return (
        <>
          <ThemedText title style={{ fontSize: 16 }}>
            Né(e) en {confirmDate?.getFullYear()}, {character?.frenchGod}(
            {character?.god}) et vous êtes...
          </ThemedText>
          <ThemedText style={{ marginTop: 5, fontSize: 14 }}>
            {character?.signification}
          </ThemedText>
        </>
      );
    }
  };
  return (
    <>
      <ThemedText style={{ marginTop: 10 }}>
        En Corée, comme dans d&apos;autres pays d&apos;Asie, les années de
        naissance sont associées à un cycle de douze animaux, appelés les 12
        Jisin (십이지신).
      </ThemedText>
      <Spacer height={5} />
      <ThemedText style={{ marginTop: 5 }}>
        C&apos;est un concept dérivé de l&apos;astrologie chinoise (appelé le
        Tti(띠) en coréen). Chaque animal représente une année dans un cycle de
        12 ans et est censé influencer les traits de caractère des personnes
        nées cette année-là.
      </ThemedText>
      <Spacer height={20} />

      <ThemedButton handleSubmit={handleSubmit} />
      <ThemedModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <View style={{ width: 300, alignItems: "center" }}>
          <ThemedDateTimePicker
            open={open}
            setOpen={setOpen}
            setConfirmDate={setConfirmDate}
            onConfirm={() => setModalVisible(false)}
          />
        </View>
      </ThemedModal>
      <Spacer height={20} />
      {confirmDate && displayTotemExplain()}
    </>
  );
};

export default AnimalTotem;
