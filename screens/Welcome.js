import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const LoginLink = styled.Text`
  color: ${colors.green};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

export default function Welcome({ navigation }) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("LogIn");

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}></View>
      <AuthLayout>
        <AuthButton
          text="Create New Account"
          disabled={false}
          onPress={goToCreateAccount}
        />
        <TouchableOpacity onPress={goToLogIn}>
          <LoginLink>Log In</LoginLink>
        </TouchableOpacity>
      </AuthLayout>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}
