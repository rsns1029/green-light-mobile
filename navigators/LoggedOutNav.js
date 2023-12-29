import React, { useRef, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: true,
        headerTransparent: true,
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{
          headerShown: false,          
        }}
        component={Welcome}
      />
      <Stack.Screen
        options={{
          headerTitle: () => null,
        }}
        name="LogIn"
        component={LogIn}
      />
      <Stack.Screen
        options={{ 
          headerShown: false,
         }}
        name="CreateAccount"
        component={CreateAccount}
      />
    </Stack.Navigator>
  );
}
