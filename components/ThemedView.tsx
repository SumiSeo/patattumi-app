import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface ThemedViewProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
  safe?: boolean;
}

const ThemedView: React.FC<ThemedViewProps> = ({
  style,
  safe = false,
  screenReaderFocusable,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  if (!safe) return <View style={[styles.container, style]} {...props} />;
  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
        styles.container,
      ]}
      {...props}
    />
  );
};

export default ThemedView;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
