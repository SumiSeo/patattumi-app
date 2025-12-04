import React, { useState } from "react";
import ThemedCalendar from "../DateTime/ThemedCalendar";
import Spacer from "../Spacer";
import ThemedButton from "../ThemedButton";
import ThemedModal from "../ThemedModal";
import ThemedText from "../ThemedText";

const KoreanHolidayCalendar = () => {
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleSubmit = () => {
    setOpen(true);
    setModalVisible(true);
  };
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
      <ThemedButton handleSubmit={handleSubmit} />
      <ThemedModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <ThemedCalendar />
      </ThemedModal>
    </>
  );
};

export default KoreanHolidayCalendar;
