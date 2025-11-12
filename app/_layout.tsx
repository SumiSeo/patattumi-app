import ThemedView from "@/components/ThemedView";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  console.log(colorScheme);

  return (
    <ThemedView>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerTintColor: "#333",
        }}
      >
        <Stack.Screen name="(auth)" />
        {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="koreanCulture"
          options={{ title: "Korean Culture" }}
        />
        <Stack.Screen name="korean" options={{ title: "Learn Korean" }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
      </Stack>
    </ThemedView>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
