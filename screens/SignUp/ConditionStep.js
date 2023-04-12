import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { useForm } from "react-hook-form";

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props) => props.theme.fontColor};
`;

const TextWrapper = styled.View`
  margin-bottom: 20px;
`;

const Text = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.fontColor};
`;

const IndentedText = styled(Text)`
  margin-left: 5px;
`;

const BtnContainer = styled.View`
  width: 80%;
  align-items: baseline;
`;

const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  color: ${(props) => props.theme.fontColor};
`;

const CheckBoxText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.fontColor};
`;

const CheckBox = styled.View`
  width: 28px;
  height: 28px;
  border-width: 1px;
  border-color: white;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const CheckBoxIcon = styled(Icon)`
  color: white;
  font-size: 20px;
`;

export default function ConditionStep({ navigation }) {
  const [agree, setAgree] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, setValue, getValues } = useForm();

  const onValid = (data) => {
    if (!agree) {
      setErrorMsg("Please check the Combo Box");
      return false;
    }

    console.log("Data : ", data);
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  const createAccount = () => {};

  return (
    <AuthLayout>
      <Container>
        <Title>Terms and Conditions</Title>
        <TextWrapper>
          <Text>
            By using this app, you agree to the following terms and conditions:
          </Text>
          <IndentedText>
            - You will not use this app for any illegal or unauthorized purpose.
          </IndentedText>
          <IndentedText>
            - You will not harass, bully, or intimidate other users of this app.
          </IndentedText>
          <IndentedText>
            - You will not post any content that is hateful, violent, or
            discriminatory.
          </IndentedText>
          <IndentedText>
            - You will not share any personal information of other users without
            their consent.
          </IndentedText>
          <IndentedText>
            - You will comply with all applicable laws and regulations.
          </IndentedText>
        </TextWrapper>

        <BtnContainer>
          <CheckBoxContainer>
            <TouchableOpacity onPress={() => setAgree(!agree)}>
              <CheckBox>
                {agree ? <CheckBoxIcon name="check" /> : null}
              </CheckBox>
            </TouchableOpacity>
            <CheckBoxText>I agree to the terms and conditions</CheckBoxText>
          </CheckBoxContainer>
          <AuthButton onPress={createAccount} text="Create Account" />
        </BtnContainer>
      </Container>
    </AuthLayout>
  );
}
