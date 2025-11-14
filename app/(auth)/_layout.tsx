import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import GuestOnly from "./GuestOnly";

const AuthLayout = () => {
  return (
    <GuestOnly>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerTintColor: "#333",
          headerShown: false,
        }}
      ></Stack>
    </GuestOnly>
  );
};

export default AuthLayout;
