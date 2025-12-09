import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View } from "react-native";
import ThemedButton from "../ThemedButton";
import ThemedText from "../ThemedText";

export type ChatLocationProps = {
  location: string;
  handleChatLocation: (value: string) => void;
  onClose: () => void;
};

const ChatLocation = ({
  location,
  handleChatLocation,
  onClose,
}: ChatLocationProps) => {
  const [selectedLocation, setSelectedLocation] = useState(location);

  const confirmLocation = () => {
    handleChatLocation(selectedLocation);
    onClose();
  };

  return (
    <View>
      <ThemedText title style={{ fontSize: 20 }}>
        Où êtes-vous ?
      </ThemedText>
      <Picker
        selectedValue={selectedLocation}
        onValueChange={(itemValue: string) => setSelectedLocation(itemValue)}
      >
        <Picker.Item label="France" value="france" />
        <Picker.Item label="Corée" value="korea" />
        <Picker.Item label="Francophone" value="francophone" />
      </Picker>
      <ThemedButton text="Confirmer" handleSubmit={confirmLocation} />
    </View>
  );
};

export default ChatLocation;