import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import ThemedCard from "../ThemedCard";

const ThemedDateTimePicker = () => {
  const [date, setDate] = useState(new Date());
  const onChange = ({ type }, selectedDate: any) => {
    console.log(selectedDate);
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    }
  };

  return (
    <ThemedCard
      style={{ alignItems: "center", width: 200, justifyContent: "center",marginHorizontal:"auto" }}
    >
      <DateTimePicker
        onChange={onChange}
        value={date}
        mode="date"
        display="spinner"
      />
    </ThemedCard>
  );
};

export default ThemedDateTimePicker;
