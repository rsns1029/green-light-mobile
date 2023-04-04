import React, { useRef, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StepOne from "./SignUp/StepOne";
import StepTwo from "./SignUp/StepTwo";
import StepThree from "./SignUp/StepThree";
import { SignUpAppContextProvider } from "./SignUp/SignUpContext";

const Stack = createStackNavigator();

export default function CreateAccount() {
  return (
    <SignUpAppContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTintColor: "white",
          headerTitle: "Create Account",
          headerTitleAlign: "center",
          headerLeft: () => null,
        }}
      >
        <Stack.Screen name="StepOne" component={StepOne} />
        <Stack.Screen name="StepTwo" component={StepTwo} />
        <Stack.Screen name="StepThree" component={StepThree} />
      </Stack.Navigator>
    </SignUpAppContextProvider>
  );
}
