import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { Text, View } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function Login() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}></View>
      <AuthLayout flexSize={1}>
        <TextInput />
        <TextInput />
      </AuthLayout>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}
