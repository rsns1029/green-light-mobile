import React, { useRef, useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../components/auth/AuthLayout";
import { TextInput } from "../../components/auth/AuthShared";
import { gql, useLazyQuery } from "@apollo/client";
import StepBar from "./StepBar";
import { SignUpAppContext } from "./SignUpContext";

const VALID_CREATE_ACCOUNT = gql`
  query ValidCreateAccount($username: String) {
    validCreateAccount(username: $username) {
      ok
      error
    }
  }
`;

export default function StepOne({ navigation }) {
  const onNext = (nextOne, fromKeyboard = true) => {
    if (fromKeyboard) {
      setIsFromKeyboard(true);
    }
    nextOne?.current?.focus();
  };

  const { username, setUsername } = useContext(SignUpAppContext);
  const { reservedUsername, setReservedUsername } =
    useContext(SignUpAppContext);
  const { email, setEmail } = useContext(SignUpAppContext);
  const { password, setPassword } = useContext(SignUpAppContext);
  const { repassword, setRepassword } = useContext(SignUpAppContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [validated, setValidated] = useState(false);
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [isFromKeyboard, setIsFromKeyboard] = useState(false);

  const handleInputChange = (setFunction, value) => {
    setFunction(value);
    setValidated(false);
  };

  const [executeQuery, { loading }] = useLazyQuery(VALID_CREATE_ACCOUNT, {
    onCompleted: (data, context) => {
      const { nextScreen } = context;
      if (data?.validCreateAccount?.ok) {
        setReservedUsername(username);
        setValidated(true);
        setErrorMsg("");
        navigation.navigate(nextScreen);
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
    console.log("nextPage : ", nextPage);
    setNextScreen(nextPage);
    console.log("nextScreen : ", nextScreen);
    if (validated) {
      console.log("already validated going to screen ", nextScreen);
      navigation.navigate(nextScreen);
      return true;
    }

    if (username === "") {
      setErrorMsg("Please write username");
      onNext(usernameRef, false);
      return false;
    }
    if (email === "") {
      setErrorMsg("Please write email");
      onNext(emailRef, false);
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
      variables: { username },
      context: { nextScreen: nextPage },
    });
  };

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();

  useEffect(() => {
    // console.log("username : ", username);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!isTextInputFocused && (
        <StepBar
          navigation={navigation}
          currentStep={1}
          style={{ marginBottom: 100, flex: 1 }}
          onBeforeNavigate={handleNext}
        />
      )}

      <AuthLayout style={{ flex: 3 }}>
        <TextInput
          ref={usernameRef}
          placeholder="User Name"
          returnKeyType="next"
          onSubmitEditing={() => onNext(emailRef)}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onChangeText={(text) => handleInputChange(setUsername, text)}
          onFocus={() => setIsTextInputFocused(true)}
          onBlur={() => {
            if (!isFromKeyboard) {
              setIsTextInputFocused(false);
            }
            setIsFromKeyboard(false);
          }}
        />
        <TextInput
          ref={emailRef}
          placeholder="Email"
          returnKeyType="next"
          onSubmitEditing={() => onNext(passwordRef)}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onChangeText={(text) => handleInputChange(setEmail, text)}
          onFocus={() => setIsTextInputFocused(true)}
          onBlur={() => {
            if (!isFromKeyboard) {
              setIsTextInputFocused(false);
            }
            setIsFromKeyboard(false);
          }}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          returnKeyType="next"
          onSubmitEditing={() => onNext(repasswordRef)}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onChangeText={(text) => handleInputChange(setPassword, text)}
          secureTextEntry
          onFocus={() => setIsTextInputFocused(true)}
          onBlur={() => {
            if (!isFromKeyboard) {
              setIsTextInputFocused(false);
            }
            setIsFromKeyboard(false);
          }}
        />
        <TextInput
          ref={repasswordRef}
          placeholder="Enter your password again"
          returnKeyType="done"
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onChangeText={(text) => handleInputChange(setRepassword, text)}
          secureTextEntry
          onFocus={() => setIsTextInputFocused(true)}
          onBlur={() => {
            if (!isFromKeyboard) {
              setIsTextInputFocused(false);
            }
            setIsFromKeyboard(false);
          }}
        />
        {errorMsg !== "" && (
          <Text style={{ color: "red", marginBottom: 10 }}>{errorMsg}</Text>
        )}
        <AuthButton
          text="Next"
          disabled={false}
          loading={loading}
          onPress={async () => handleNext("StepTwo")}
        />
      </AuthLayout>
    </View>
  );
}
