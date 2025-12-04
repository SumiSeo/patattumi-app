import { lunarBirthdayToSolar } from "@/utils/games/calcLunarYear";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import ThemedDateTimePicker from "../DateTime/ThemedDateTimePicker";
import Spacer from "../Spacer";
import ThemedButton from "../ThemedButton";
import ThemedModal from "../ThemedModal";
import ThemedText from "../ThemedText";

const CalendarLunarYear = () => {
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

  const displayKoreanLunarYear = () => {
    if (confirmDate) {
      const parsed = confirmDate + "";
      const data = lunarBirthdayToSolar(parsed);

      return (
        <>
          <ThemedText title style={{ fontSize: 16 }}>
            {data}
          </ThemedText>
        </>
      );
    }
  };

  return (
    <>
      <ThemedText style={{ marginTop: 10 }}>
        En Corée, certaines personnes célèbrent encore leur anniversaire selon
        le calendrier lunaire. Comme la date lunaire se décale chaque année dans
        le calendrier solaire, il faut la convertir tous les ans grâce à un
        calendrier ou une application.
      </ThemedText>
      <Spacer height={5} />
      <ThemedText style={{ marginTop: 5 }}>
        C&apos;est une tradition encore présente dans plusieurs familles,
        surtout pour garder les habitudes anciennes ou pour certaines
        cérémonies.
      </ThemedText>
      <ThemedText title style={{ marginTop: 5, fontSize: 14 }}>
        Ici, vous devez mettre votre date dans le calendrier lunaire de cette
        année.
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
      {confirmDate && displayKoreanLunarYear()}
    </>
  );
};

export default CalendarLunarYear;
