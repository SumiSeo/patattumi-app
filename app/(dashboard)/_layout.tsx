import { Tabs } from "expo-router";
import React from "react";

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingTop: 10,
          height: 70,
        },
        tabBarActiveTintColor: "#000",
      }}
    >
        <Tabs.Screen name="koreanCulture" options={{title:"Culture"}}/>
        <Tabs.Screen name="koreanLanguage" options={{title:"Langue"}}/>
        <Tabs.Screen name="travelKorea" options={{title:"Voyage"}}/>
        <Tabs.Screen name="recipes" options={{title:"Recettes"}}/>
        <Tabs.Screen name="profile" options={{title:"Profile"}}/>
    </Tabs>
  );
};

export default DashboardLayout;
