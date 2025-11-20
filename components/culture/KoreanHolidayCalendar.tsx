import React from "react";
import ThemedCalendar from "../DateTime/ThemedCalendar";
import Spacer from "../Spacer";
import ThemedText from "../ThemedText";

const KoreanHolidayCalendar = () => {
  return (
    <>
      <ThemedText style={{ marginTop: 10 }}>
        En Corée, les horaires d&apos;ouverture des musées, des trains ou
        d&apos;autres services peuvent changer pendant les jours fériés. Pensez
        donc à vérifier avant votre voyage.
      </ThemedText>
      <Spacer height={5} />
      <ThemedText>
        Sachez aussi que pendant les grandes fêtes traditionnelles comme Seollal
        ou Chuseok, de nombreuses boutiques peuvent être fermées.
      </ThemedText>
      <Spacer height={10} />
      <ThemedCalendar />
    </>
  );
};

export default KoreanHolidayCalendar;
