import React, { useEffect, useContext, useState } from "react";
import { Text, View } from "react-native";
import { SignUpAppContext } from "./SignUpContext";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../components/auth/AuthLayout";
import styled, { css } from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";
import StepBar from "./StepBar";
import { colors } from "../../colors";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 90px;
  margin-bottom: 150px;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  background-color: grey;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  width: 150px;

  ${(props) =>
    props.isSelected &&
    css`
      background-color: ${colors.green};
    `}
`;

const GenderIcon = styled(Icon)`
  margin-bottom: 10px;
`;

const ButtonLabel = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;

  ${(props) =>
    props.isSelected &&
    css`
      color: #000;
    `}
`;

const GenderButton = ({ icon, label, onPress, isSelected }) => {
  return (
    <Button isSelected={isSelected} onPress={onPress}>
      <GenderIcon name={icon} size={80} color={isSelected ? "#000" : "#fff"} />
      <ButtonLabel isSelected={isSelected}>{label}</ButtonLabel>
    </Button>
  );
};

export default function StepTwo({ navigation }) {
  const { username, setUsername } = useContext(SignUpAppContext);
  const { gender, setGender } = useContext(SignUpAppContext);

  const [selectedGender, setSelectedGender] = useState(gender);

  const handleGenderSelection = (g) => {
    setSelectedGender(g);
    setGender(g);
  };

  const HeaderBar = () => (
    <StepBar
      navigation={navigation}
      currentStep={2}
      style={{ marginBottom: 100, flex: 1 }}
      onBeforeNavigate={null}
    />
  );

  useEffect(() => {
    console.log("gender : ", gender);
    navigation.setOptions({
      headerTitle: HeaderBar,
    });
  }, []);

  return (
    <AuthLayout>
      <Container>
        <GenderButton
          icon="mars"
          label="Male"
          onPress={() => handleGenderSelection("M")}
          isSelected={selectedGender === "M"}
        />
        <GenderButton
          icon="venus"
          label="Female"
          onPress={() => handleGenderSelection("F")}
          isSelected={selectedGender === "F"}
        />
      </Container>
    </AuthLayout>
  );
}
