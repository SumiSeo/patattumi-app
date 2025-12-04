import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View } from "react-native";
import ThemedText from "../ThemedText";

export type ChatLocationProps = {
  location: string;
  handleChatLocation: (value: string) => void;
};

const ChatLocation = ({ location, handleChatLocation }: ChatLocationProps) => {
  const [selectedLocation, setSelectedLocation] = useState(location);

  return (
    <View>
      <ThemedText title style={{ fontSize: 20 }}>
        Où êtes-vous ?
      </ThemedText>
      <Picker
        selectedValue={selectedLocation}
        onValueChange={(itemValue) => {
          setSelectedLocation(itemValue);
          handleChatLocation(itemValue);
        }}
      >
        <Picker.Item label="France" value="france" />
        <Picker.Item label="Corée" value="korea" />
        <Picker.Item label="Francophone" value="francophone" />
      </Picker>
    </View>
  );
};

export default ChatLocation;
