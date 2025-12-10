import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import UserOnly from "../(auth)/UserOnly";

const DashboardLayout = () => {
  const { t } = useTranslation();

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
            title: t("layout.culture"),
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
            title: t("layout.language"),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={20}
                color={focused ? "black" : "#687076"}
                name={focused ? "book" : "book-outline"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: t("layout.chat"),
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
          name="recipes"
          options={{
            title: t("layout.recipes"),
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
          name="profile"
          options={{
            title: t("layout.profil"),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={20}
                color={focused ? "black" : "#687076"}
                name={focused ? "person" : "person-outline"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="recipes/[id]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="culture/[id]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="korean/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </UserOnly>
  );
};

export default DashboardLayout;
