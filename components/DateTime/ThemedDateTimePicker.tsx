import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import ThemedCard from "../ThemedCard";

type ThemedDateTimePickerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ThemedDateTimePicker = ({ open, setOpen }: ThemedDateTimePickerProps) => {
  const [date, setDate] = useState(new Date());
  const onChange = ({ type }, selectedDate: any) => {
    console.log(selectedDate);
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else setOpen(!open);
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
          display="calendar"
        />
      )}
    </ThemedCard>
  );
};

export default ThemedDateTimePicker;
