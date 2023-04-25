import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import EmptyScreen from "../screens/EmptyScreen";
import Rooms from "../screens/Rooms";
import TabIcon from "../components/nav/TabIcon";

const Tabs = createBottomTabNavigator();

export default function TabsNav({ theme }) {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.text,
        },
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tabs.Screen
        name="LiveMap"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"map"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Chats"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName={"chatbox-ellipses"}
              color={color}
              focused={focused}
            />
          ),
        }}
        component={Rooms}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Profile"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
