import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerTintColor: "#333",
          headerShown: false,
        }}
      >
      </Stack>
    </>
  );
};

export default AuthLayout;
