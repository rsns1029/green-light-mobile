import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Rooms from "../screens/Rooms";
import Room from "../screens/Room";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import { useTheme } from "styled-components";

const NativeStack = createStackNavigator();

export default function MessagesNav({ navigation }) {
  return (
    <NativeStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "grey",
      }}
    >
      <NativeStack.Screen
        name="Rooms"
        component={Rooms}
        options={{
          headerShown: true,
          title: "Messages",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Ionicons
              name="close"
              size={24}
              color="black"
              onPress={() => navigation.navigate("Tabs")}
              style={{ marginLeft: 10 }}
            />
          ),
          headerStyle: { backgroundColor: colors.green },
        }}
      />
      <NativeStack.Screen
        options={{ headerShown: true }}
        name="Room"
        component={Room}
      />
    </NativeStack.Navigator>
  );
}
