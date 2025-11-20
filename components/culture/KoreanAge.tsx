import { calcKoreanAge } from "@/utils/games/calcAgeKorean";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import ThemedDateTimePicker from "../DateTime/ThemedDateTimePicker";
import Spacer from "../Spacer";
import ThemedModal from "../ThemedModal";
import ThemedText from "../ThemedText";
import ThemedButton from "../ThmedButton";

const KoreanAge = () => {
  const [open, setOpen] = useState(false);
  const [confirmDate, setConfirmDate] = useState<Date | null>(null);
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

  const displayKoreanAnge = () => {
    if (confirmDate) {
      const data = calcKoreanAge(confirmDate?.toString());
      if (data.frenchAge === "" && data.koreanAge === "")
        return (
          <>
            <ThemedText title style={{ fontSize: 16 }}>
              Soit tu as un an, soit tu n’es même pas encore né(e)🇰🇷🇫🇷
            </ThemedText>
          </>
        );
      return (
        <>
          <ThemedText title style={{ fontSize: 16 }}>
            Tu as {data.koreanAge} ans selon l&apos;âge coréen🇰🇷, mais
            {data.frenchAge} ans selon l&apos;âge français🇫🇷.
          </ThemedText>
        </>
      );
    }
  };

  return (
    <>
      <ThemedText style={{ marginTop: 10 }}>
        En Corée, il existait traditionnellement une manière particulière de
        compter l&apos;âge. Le système coréen considérait que l&apos;on avait
        déjà un an dès la naissance, et qu&apos;on vieillissait tous ensemble au
        nouvel an.
      </ThemedText>
      <Spacer height={5} />
      <ThemedText style={{ marginTop: 5 }}>
        Même si la loi a changé et que l&apos;âge international est désormais
        utilisé, beaucoup de Coréens continuent d&apos;employer “l&apos;âge
        coréen” dans la vie quotidienne.
      </ThemedText>
      <Spacer height={20} />
      <ThemedButton handleSubmit={handleSubmit} />
      <ThemedModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <ThemedDateTimePicker
          open={open}
          setOpen={setOpen}
          setConfirmDate={setConfirmDate}
          onConfirm={() => setModalVisible(false)}
        />
      </ThemedModal>
      <Spacer height={20} />
      {confirmDate && displayKoreanAnge()}
    </>
  );
};

export default KoreanAge;
