import { calcKoreanAge } from "@/utils/games/calcAgeKorean";
import React, { useState } from "react";
import ThemedDateTimePicker from "../DateTime/ThemedDateTimePicker";
import Spacer from "../Spacer";
import ThemedText from "../ThemedText";
import ThemedButton from "../ThmedButton";

const KoreanAge = () => {
  const [open, setOpen] = useState(false);
  const [confirmDate, setConfirmDate] = useState<Date | null>(null);

  const displayKoreanAnge = () => {
    if (confirmDate) {
      const data = calcKoreanAge(confirmDate?.toString());

      return (
        <>
          <ThemedText title style={{ fontSize: 16 }}>
            Tu as {data.koreanAge} selon l&apos;age coréen🇰🇷, mais {data.frenchAge}
            selon &apos;age français🇫🇷.
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
      <ThemedText style={{ marginTop: 5 }}>
        Même si la loi a changé et que l&apos;âge international est désormais
        utilisé, beaucoup de Coréens continuent d&apos;employer “l&apos;âge
        coréen” dans la vie quotidienne.
      </ThemedText>
      <Spacer height={20} />
      <ThemedButton handleSubmit={() => setOpen(!open)}></ThemedButton>
      <ThemedDateTimePicker
        open={open}
        setOpen={setOpen}
        setConfirmDate={setConfirmDate}
      />
      {confirmDate && displayKoreanAnge()}
    </>
  );
};

export default KoreanAge;
