import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useRef, useState } from "react";
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
}: ThemedDateTimePickerProps) => {
  const [date, setDate] = useState(new Date());
  const debounceTimer = useRef<number | null>(null);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set") {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      debounceTimer.current = setTimeout(() => {
        if (selectedDate) {
          setDate(selectedDate);
          setConfirmDate(selectedDate);
          setOpen(false);
        }
      }, 2500);
    }
  };

  return (
    <ThemedCard
      style={{
        alignItems: "center",
        width: 200,
        justifyContent: "center",
        marginHorizontal: "auto",
      }}
    >
      {open && (
        <DateTimePicker
          onChange={onChange}
          value={date}
          mode="date"
          display="spinner"
        />
      )}
    </ThemedCard>
  );
};

export default ThemedDateTimePicker;
