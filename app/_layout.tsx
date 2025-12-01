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

const userJwt = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlN1bWkiLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiZGIyNmZjMWItMzczNi00YWFlLTg5MjQtMzhiODY4MzliZWZlIn0sImlhdCI6MTc2NDU5MjAyNiwiZXhwIjoxNzY0NTk1NjI2fQ._jqzfpQCNfmNwcOwCLL4PH5HzLuUxgaFu_nW66QQFyQ`;

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: Constants.expoConfig?.extra?.HASURA_URI,
//     headers: {
//       "x-hasura-admin-secret": Constants.expoConfig?.extra?.HASURA_SECRET,
//     },
//   }),
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  link: new HttpLink({
    uri: Constants.expoConfig?.extra?.HASURA_URI,
    headers: {
      Authorization: `Bearer ${userJwt}`,
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
