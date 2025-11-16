import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import UserOnly from "../(auth)/UserOnly";

const DashboardLayout = () => {
  return (
    <UserOnly>
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
        <Tabs.Screen
          name="koreanCulture"
          options={{
            title: "Culture",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={20}
                color={focused ? "black" : "#687076"}
                name={focused ? "airplane" : "airplane-outline"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="koreanLanguage"
          options={{
            title: "Langue",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={20}
                color={focused ? "black" : "#687076"}
                name={focused ? "book" : "book-outline"}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="travelKorea"
          options={{
            title: "Voyage",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                color={focused ? "black" : "#687076"}
                size={20}
                name={focused ? "airplane" : "airplane-outline"}
              />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="recipes"
          options={{
            title: "Recettes",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={20}
                color={focused ? "black" : "#687076"}
                name={focused ? "fish" : "fish-outline"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={20}
                color={focused ? "black" : "#687076"}
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={20}
                color={focused ? "black" : "#687076"}
                name={focused ? "person" : "person-outline"}
              />
            ),
          }}
        />
      </Tabs>
    </UserOnly>
  );
};

export default DashboardLayout;
