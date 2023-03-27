import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function CreateAccount() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  return (
    <AuthLayout>
      <TextInput
        placeholder="First Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("firstName", text)}
      />
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("lastName", text)}
      />
    </AuthLayout>
  );
}
