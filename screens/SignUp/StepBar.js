import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import {
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

const Container = styled.View`
  margin-top : 20px
  flex-direction: row;
  justify-content: center;
`;
const StepBtn = styled.TouchableOpacity`
  background-color: gray;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
`;

export default function StepBar({ navigation, currentStep }) {
  const handlePressStepOne = () => {
    navigation.navigate("StepOne");
  };

  const handlePressStepTwo = () => {
    navigation.navigate("StepTwo");
  };

  const handlePressStepThree = () => {
    navigation.navigate("StepThree");
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
    >
      <Container>
        <StepBtn
          onPress={handlePressStepOne}
          style={{
            backgroundColor: currentStep === 1 ? colors.green : "gray",
          }}
        >
          <Text style={{ color: "white" }}> 1 </Text>
        </StepBtn>
        <StepBtn
          onPress={handlePressStepTwo}
          style={{
            backgroundColor: currentStep === 2 ? colors.green : "gray",
          }}
        >
          <Text style={{ color: "white" }}> 2 </Text>
        </StepBtn>
        <StepBtn
          onPress={handlePressStepThree}
          style={{
            backgroundColor: currentStep === 3 ? colors.green : "gray",
          }}
        >
          <Text style={{ color: "white" }}> 3 </Text>
        </StepBtn>
      </Container>
    </TouchableWithoutFeedback>
  );
}
