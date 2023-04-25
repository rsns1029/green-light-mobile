import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Rooms from "../screens/Rooms";
import Room from "../screens/Room";

const NativeStack = createNativeStackNavigator();

export default function MessagesNav({ theme }) {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "grey",
      }}
    >
      <NativeStack.Screen name="Rooms" component={Rooms} />
      <NativeStack.Screen name="Room" component={Room} />
    </NativeStack.Navigator>
  );
}
