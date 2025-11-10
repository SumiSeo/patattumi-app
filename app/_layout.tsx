import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from 'react-native';

const RootLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{
        headerStyle:{
          backgroundColor:"#ddd",
        },
         headerTintColor:"#333"
      }}>
        <Stack.Screen name="index" options={{title:"Home", headerShown:false}}/>
        <Stack.Screen name="koreanCulture" options={{title:"Korean Culture"}}/>
        <Stack.Screen name="korean" options={{title:"Learn Korean"}}/>
        <Stack.Screen name="profile" options={{title:"Profile}"}}/>
      </Stack>
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
