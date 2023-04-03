import React, { useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { SignUpAppContext } from "./SignUpContext";

export default function StepTwo() {
  const { username, setUsername } = useContext(SignUpAppContext);
  useEffect(() => {
    console.log("username : ", username);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: "white" }}>step2</Text>
    </View>
  );
}
