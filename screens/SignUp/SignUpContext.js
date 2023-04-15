import React, { useState } from "react";
import { format } from "date-fns";

const SignUpAppContext = React.createContext();

const SignUpAppContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [reservedUsername, setReservedUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDay, setBirthDay] = useState(format(new Date(), "yyyy/MM/dd"));
  const [avatar, setAvatar] = useState(null);

  const contextValue = {
    username,
    setUsername,
    reservedUsername,
    setReservedUsername,
    email,
    setEmail,
    password,
    setPassword,
    repassword,
    setRepassword,
    gender,
    setGender,
    birthDay,
    setBirthDay,
    avatar,
    setAvatar,
    phoneNo,
    setPhoneNo,
  };

  return (
    <SignUpAppContext.Provider value={contextValue}>
      {children}
    </SignUpAppContext.Provider>
  );
};

export { SignUpAppContext, SignUpAppContextProvider };
