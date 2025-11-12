import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

const profile = () => {
  return (
    <ThemedView safe={true}>
      <ThemedText title>Profile</ThemedText>
    </ThemedView>
  );
};

export default profile;

const styles = StyleSheet.create({});
