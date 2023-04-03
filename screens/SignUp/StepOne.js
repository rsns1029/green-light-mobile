import React, { useRef, useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../components/auth/AuthLayout";
import { TextInput } from "../../components/auth/AuthShared";
import { gql, useLazyQuery } from "@apollo/client";
import StepBar from "./StepBar";
import { SignUpAppContext } from "./SignUpContext";

const VALID_CREATE_ACCOUNT = gql`
  query ValidCreateAccount($username: String, $nextPage: String) {
    validCreateAccount(username: $username, nextPage: $nextPage) {
      ok
      error
      nextPage
    }
  }
`;

export default function StepOne({ navigation }) {
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const { username, setUsername } = useContext(SignUpAppContext);
  const { reservedUsername, setReservedUsername } =
    useContext(SignUpAppContext);
  const { password, setPassword } = useContext(SignUpAppContext);
  const { repassword, setRepassword } = useContext(SignUpAppContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [validated, setValidated] = useState(false);

  const handleInputChange = (setFunction, value) => {
    setFunction(value);
    setValidated(false);
  };

  const [executeQuery, { loading }] = useLazyQuery(VALID_CREATE_ACCOUNT, {
    onCompleted: (data) => {
      if (data?.validCreateAccount?.ok) {
        console.log(data);
        setReservedUsername(username);
        setValidated(true);
        setErrorMsg("");
        if (data.validCreateAccount.nextPage) {
          navigation.navigate(data.validCreateAccount.nextPage);
        }
      } else {
        setErrorMsg("Username already exists");
        setReservedUsername("");
        setValidated(false);
      }
    },
    onError: (error) => {
      console.log(error);
      setErrorMsg("Network issue");
    },
  });

  const handleNext = async (nextPage) => {
    if (validated) {
      navigation.navigate(nextPage);
      return true;
    }

    if (username === "") {
      setErrorMsg("Please write username");
      onNext(usernameRef, false);
      return false;
    }
    if (password === "") {
      setErrorMsg("Please write password");
      onNext(passwordRef, false);
      return false;
    }
    if (repassword === "") {
      setErrorMsg("Please rewrite password");
      onNext(repasswordRef, false);
      return false;
    }
    if (password !== repassword) {
      setErrorMsg("Passwords not matched. Please write your password again");
      onNext(passwordRef);
      return false;
    }
    await executeQuery({
      variables: { username, nextPage },
    });
  };

  const usernameRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();

  const HeaderBar = () => (
    <StepBar
      navigation={navigation}
      currentStep={1}
      style={{ marginBottom: 100, flex: 1 }}
      onBeforeNavigate={handleNext}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderBar,
    });
  }, []);

  useEffect(() => {
    // console.log("username : ", username);
  }, []);
  /* {!isTextInputFocused && (
        <StepBar
          navigation={navigation}
          currentStep={1}
          style={{ marginBottom: 100, flex: 1 }}
          onBeforeNavigate={handleNext}
        />
      )} */
  return (
    <AuthLayout>
      <View style={{}}>
        <TextInput
          ref={usernameRef}
          placeholder="User Name"
          returnKeyType="next"
          onSubmitEditing={() => onNext(passwordRef)}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onChangeText={(text) => handleInputChange(setUsername, text)}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          returnKeyType="next"
          onSubmitEditing={() => onNext(repasswordRef)}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onChangeText={(text) => handleInputChange(setPassword, text)}
          secureTextEntry
        />
        <TextInput
          ref={repasswordRef}
          placeholder="Enter your password again"
          returnKeyType="done"
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onChangeText={(text) => handleInputChange(setRepassword, text)}
          lastOne={true}
          secureTextEntry
        />
        {errorMsg !== "" && (
          <Text style={{ color: "red", marginBottom: 10 }}>{errorMsg}</Text>
        )}
      </View>
      <View style={{}}>
        <AuthButton
          text="Next"
          disabled={false}
          loading={loading}
          onPress={async () => handleNext("StepTwo")}
        />
      </View>
    </AuthLayout>
  );
}
