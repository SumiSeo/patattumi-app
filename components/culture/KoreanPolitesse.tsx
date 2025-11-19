import React, { useState } from "react";
import ChoiceBetweenTwo from "../ChoiceGame/ChoiceBetweenTwo";
import ThemedText from "../ThemedText";

const KoreanPolitesse = () => {
  const [open, setOpen] = useState(false);
  const [confirmDate, setConfirmDate] = useState<Date | null>(null);

  return (
    <>
      <ThemedText title style={{ fontSize: 14 ,marginTop:20}}>
        Quel comportement est inacceptable en Corée ?
      </ThemedText>
      <ChoiceBetweenTwo />
    </>
  );
};

export default KoreanPolitesse;
