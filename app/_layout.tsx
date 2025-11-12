import ThemedView from "@/components/ThemedView";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

const RootLayout = () => {
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
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
      </Stack>
    </ThemedView>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
