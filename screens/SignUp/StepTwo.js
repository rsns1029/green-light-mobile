import React, { useEffect, useContext, useState } from "react";
import { View } from "react-native";
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
  margin-bottom: 10px;
`;

const BtnContainer = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 100px;
  width: 85%;
  align-self: center;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  background-color: grey;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  width: 40%;

  ${(props) =>
    props.isSelected &&
    css`
      background-color: ${colors.green};
    `}
`;

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
  align-self: center;
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
  const { gender, setGender } = useContext(SignUpAppContext);
  const [selectedGender, setSelectedGender] = useState(gender);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGenderSelection = (g) => {
    setSelectedGender(g);
    setGender(g);
    setErrorMsg("");
  };

  const handleNext = (nextPage) => {
    console.log(gender);
    if (gender == null || gender == "") {
      setErrorMsg("Please, select the gender");
      return false;
    }
    navigation.navigate(nextPage);
  };

  const HeaderBar = () => (
    <StepBar
      navigation={navigation}
      currentStep={2}
      style={{ marginBottom: 100, flex: 1 }}
      onBeforeNavigate={handleNext}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderBar,
    });
  }, [gender]);

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
      {errorMsg !== "" && <ErrorText>{errorMsg}</ErrorText>}
      <BtnContainer>
        <AuthButton
          text="Next"
          disabled={false}
          onPress={() => handleNext("StepThree")}
        />
      </BtnContainer>
    </AuthLayout>
  );
}
