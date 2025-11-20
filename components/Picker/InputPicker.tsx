import { Picker } from "@react-native-picker/picker";
import React, { useRef } from "react";

type InputPickerProps = {
  choices: string[];
  value: string | null;
  onChange: (value: string) => void;
};
const InputPicker = ({ choices, value, onChange }: InputPickerProps) => {
  const pickerRef = useRef<Picker<string>>(null);

  return (
    <Picker
      ref={pickerRef}
      selectedValue={value}
      onValueChange={(itemValue) => onChange(value)}
    >
      {choices.map((choice) => (
        <Picker.Item key={choice} label={choice} value={choice} />
      ))}
    </Picker>
  );
};

export default InputPicker;
