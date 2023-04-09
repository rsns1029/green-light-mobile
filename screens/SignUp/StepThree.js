import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "../../components/auth/AuthShared";
import { format } from "date-fns";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";
import { SignUpAppContext } from "./SignUpContext";
import StepBar from "./StepBar";

const Text = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 20px;
  margin-bottom: 10px;
`;

export default function StepThree({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const { birthDay, setBirthDay } = useContext(SignUpAppContext);
  const [errorMsg, setErrorMsg] = useState("");

  const handleNext = (nextPage) => {
    if (birthDay == null || birthDay == "") {
      setErrorMsg("Please, write your Birth Date");
      return false;
    }
    navigation.navigate(nextPage);
  };

  const HeaderBar = () => (
    <StepBar
      navigation={navigation}
      currentStep={3}
      style={{ marginBottom: 100, flex: 1 }}
      onBeforeNavigate={handleNext}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderBar,
    });
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log("BirthDate : ", currentDate);
    // Format the date as a string with the desired format
    const formattedDate = format(currentDate, "yyyy/MM/dd");
    setBirthDay(formattedDate);
    setErrorMsg("");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <AuthLayout>
      <Text>Your BirthDay</Text>
      <TouchableOpacity onPress={showDatepicker}>
        <TextInput value={birthDay} editable={false} />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
      {errorMsg !== "" && <ErrorText>{errorMsg}</ErrorText>}
      <AuthButton
        text="Next"
        disabled={false}
        onPress={() => handleNext("StepFour")}
      />
    </AuthLayout>
  );
}
