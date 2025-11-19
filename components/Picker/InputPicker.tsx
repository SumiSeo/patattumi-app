import { Picker } from "@react-native-picker/picker";
import React, { useRef, useState } from "react";

type InputPickerProps = {
  choices: string[];
};
const InputPicker = ({ choices }: InputPickerProps) => {
  const pickerRef = useRef<Picker<string>>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<
    string | undefined
  >();

  function open() {
    pickerRef.current?.focus();
  }

  function close() {
    pickerRef.current?.blur();
  }

  return (
      <Picker
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
      >
        {choices.map((choice) => (
          <Picker.Item key={choice} label={choice} value={choice} />
        ))}
      </Picker>
  );
};

export default InputPicker;
