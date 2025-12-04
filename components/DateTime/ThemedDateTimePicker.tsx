import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import ThemedButton from "../ThemedButton";
import ThemedCard from "../ThemedCard";

type ThemedDateTimePickerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setConfirmDate: (date: Date) => void;
};

const ThemedDateTimePicker = ({
  open,
  setOpen,
  setConfirmDate,
  onConfirm, // 새 prop 추가
}: ThemedDateTimePickerProps & { onConfirm?: () => void }) => {
  const [date, setDate] = useState(new Date());

  const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) setDate(selectedDate);
  };

  const handleSubmit = () => {
    setConfirmDate(date);
    if (onConfirm) onConfirm();
    setOpen(false);
  };

  return (
    <ThemedCard style={{ paddingHorizontal: 20 }}>
      {open && (
        <DateTimePicker
          textColor="black"
          onChange={onChange}
          value={date}
          mode="date"
          display="spinner"
        />
      )}
      <ThemedButton text="Confirmer" handleSubmit={handleSubmit} />
    </ThemedCard>
  );
};

export default ThemedDateTimePicker;
