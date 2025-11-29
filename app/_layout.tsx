import ThemedView from "@/components/ThemedView";
import { RecipeProvider } from "@/contexts/RecipeContext";
import { UserProvider } from "@/contexts/UserContext";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

console.log(Constants.expoConfig?.extra?.HASURA_URI);
const client = new ApolloClient({
  link: new HttpLink({
    uri: Constants.expoConfig?.extra?.HASURA_URI,
    headers: {
      "x-hasura-admin-secret": Constants.expoConfig?.extra?.HASURA_SECRET,
    },
  }),
  cache: new InMemoryCache(),
});

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
