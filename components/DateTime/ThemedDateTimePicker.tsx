import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import ThemedCard from "../ThemedCard";

type ThemedDateTimePickerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setConfirmDate: (date: number) => void;
};

const ThemedDateTimePicker = ({
  open,
  setOpen,
  setConfirmDate,
}: ThemedDateTimePickerProps) => {
  const [date, setDate] = useState(new Date());
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set") {
      const currentDate = selectedDate;
      const year = currentDate?.getFullYear();
      if (year) {
        setConfirmDate(year);
        setOpen(!open);
      }
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
