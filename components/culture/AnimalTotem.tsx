import { calculate12God } from "@/utils/games/calcAnimalTotem";
import React, { useState } from "react";
import ThemedDateTimePicker from "../DateTime/ThemedDateTimePicker";
import Spacer from "../Spacer";
import ThemedText from "../ThemedText";
import ThemedButton from "../ThmedButton";
const AnimalTotem = () => {
  const [open, setOpen] = useState(false);
  const [confirmDate, setConfirmDate] = useState<number>(0);

  const displayTotemExplain = () => {
    const character = calculate12God(confirmDate);
    return (
      <>
        <ThemedText title style={{ fontSize: 16 }}>
          Né(e) en {confirmDate}, {character?.frenchGod}({character?.god}) et
          vous êtes...
        </ThemedText>
        <ThemedText style={{ marginTop: 5, fontSize: 14 }}>
          {character?.signification}
        </ThemedText>
      </>
    );
  };
  return (
    <>
      <ThemedText style={{ marginTop: 10 }}>
        En Corée, comme dans d&apos;autres pays d&apos;Asie, les années de
        naissance sont associées à un cycle de douze animaux, appelés les 12
        Jisin (십이지신).
      </ThemedText>
      <ThemedText style={{ marginTop: 5 }}>
        C&apos;est un concept dérivé de l&apos;astrologie chinoise (appelé le
        Tti(띠) en coréen). Chaque animal représente une année dans un cycle de
        12 ans et est censé influencer les traits de caractère des personnes
        nées cette année-là.
      </ThemedText>
      <Spacer height={20} />
      <ThemedButton handleSubmit={() => setOpen(!open)}></ThemedButton>
      <ThemedDateTimePicker
        open={open}
        setOpen={setOpen}
        setConfirmDate={setConfirmDate}
      />
      {confirmDate && displayTotemExplain()}
    </>
  );
};

export default AnimalTotem;
