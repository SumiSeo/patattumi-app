import { Situation } from "@/types/SituationType";
import React, { useState } from "react";
import ChoiceBetweenTwo from "../ChoiceGame/ChoiceBetweenTwo";
import ThemedText from "../ThemedText";

const situations: Situation[] = [
  { id: 1, text: "Avec une personne plus âgée" },
  { id: 3, text: "Pendant le repas" },
  { id: 5, text: "Avec une personne rencontrée pour la première fois" },
  { id: 7, text: "Dans les transports" },
];
const responses = [2, 1, 2, 2];

const KoreanPolitesse = () => {
  const [open, setOpen] = useState(false);
  const [confirmDate, setConfirmDate] = useState<Date | null>(null);

  return (
    <>
      <ThemedText title style={{ fontSize: 14, marginTop: 20 }}>
        Quel comportement est inacceptable en Corée ?
      </ThemedText>
      <ChoiceBetweenTwo situations={situations} correctResponses={responses} />
    </>
  );
};

export default KoreanPolitesse;
