import React from "react";
import { DimensionValue, View, ViewProps } from "react-native";

interface SpacerProps extends ViewProps {
  width?: DimensionValue;
  height?: DimensionValue;
}

const Spacer: React.FC<SpacerProps> = ({ width = "100%", height = 40 }) => {
  return <View style={{ width, height }} />;
};

export default Spacer;
