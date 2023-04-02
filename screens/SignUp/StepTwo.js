import React, { useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { SignUpAppContext } from "./SignUpContext";

export default function StepTwo() {
  const { username, setUsername } = useContext(SignUpAppContext);
  useEffect(() => {
    console.log("username : ", username);
  }, []);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Notifications</Text>
    </View>
  );
}
