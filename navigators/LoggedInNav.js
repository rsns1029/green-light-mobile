import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNav from "./TabsNav";
import MessagesNav from "./MessagesNav";

const Nav = createNativeStackNavigator();

export default function LoggedInNav({ MyTheme }) {
  return (
    <Nav.Navigator>
      <Nav.Screen
        name="Tabs"
        options={{ headerShown: false }}
        // Pass MyTheme object as a prop to TabsNav component
        children={() => <TabsNav theme={MyTheme} />}
      />
      <Nav.Screen
        name="Messages"
        options={{ headerShown: true }}
        children={() => <MessagesNav theme={MyTheme} />}
      />
    </Nav.Navigator>
  );
}
