import ThemedView from "@/components/ThemedView";
import { FontProvider } from "@/contexts/FontContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { RecipeProvider } from "@/contexts/RecipeContext";
import { UserProvider } from "@/contexts/UserContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

const RootLayout = () => {
  return (
    <LanguageProvider>
      <FontProvider>
        <UserProvider>
          <RecipeProvider>
            <ThemedView safe={true}>
              <StatusBar style="auto" />
              <Stack
                screenOptions={{
                  headerTintColor: "#333",
                }}
              >
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(dashboard)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="index"
                  options={{ title: "Home", headerShown: false }}
                />
              </Stack>
            </ThemedView>
          </RecipeProvider>
        </UserProvider>
      </FontProvider>
    </LanguageProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
