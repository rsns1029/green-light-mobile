import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Container = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: center;
`;

const StepBtn = styled.TouchableOpacity`
  background-color: gray;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
`;

const Text = styled.Text`
  color: white;
`;

export default function StepBar({ navigation, currentStep, onBeforeNavigate }) {
  return (
    <Container>
      <StepBtn
        onPress={async () => onBeforeNavigate("StepOne")}
        style={{
          backgroundColor: currentStep === 1 ? colors.green : "gray",
        }}
      >
        <Text> 1 </Text>
      </StepBtn>
      <StepBtn
        onPress={async () => onBeforeNavigate("StepTwo")}
        style={{
          backgroundColor: currentStep === 2 ? colors.green : "gray",
        }}
      >
        <Text> 2 </Text>
      </StepBtn>
      <StepBtn
        onPress={async () => onBeforeNavigate("StepThree")}
        style={{
          backgroundColor: currentStep === 3 ? colors.green : "gray",
        }}
      >
        <Text> 3 </Text>
      </StepBtn>
      <StepBtn
        onPress={async () => onBeforeNavigate("StepFour")}
        style={{
          backgroundColor: currentStep === 4 ? colors.green : "gray",
        }}
      >
        <Text> 4 </Text>
      </StepBtn>
    </Container>
  );
}
