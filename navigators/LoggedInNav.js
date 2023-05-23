import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNav from "./TabsNav";
import MessagesNav from "./MessagesNav";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components";

const Nav = createStackNavigator();

export default function LoggedInNav() {
  const theme = useTheme();

  return (
    <Nav.Navigator
      screenOptions={{
        backgroundColor: theme.bgColor,
        cardStyle: { backgroundColor: theme.bgColor },
        animationEnabled: false,
      }}
    >
      <Nav.Screen
        name="Tabs"
        options={{ headerShown: false }}
        // Pass MyTheme object as a prop to TabsNav component
        component={TabsNav}
      />
      <Nav.Screen
        name="Messages"
        options={{ headerShown: false }}
        component={MessagesNav}
      />
    </Nav.Navigator>
  );
}
