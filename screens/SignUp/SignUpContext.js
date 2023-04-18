import React, { useState } from "react";
import { format } from "date-fns";

const SignUpAppContext = React.createContext();

const SignUpAppContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [instaUsername, setInstaUsername] = useState("");
  const [reservedUsername, setReservedUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [sex, setSex] = useState("");
  const [birthDay, setBirthDay] = useState(format(new Date(), "yyyy/MM/dd"));
  const [avatarUri, setAvataraUri] = useState(null);
  const [interestingSex, setInterestingSex] = useState("");

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
    sex,
    setSex,
    birthDay,
    setBirthDay,
    avatarUri,
    setAvataraUri,
    phoneNo,
    setPhoneNo,
    instaUsername,
    setInstaUsername,
    interestingSex,
    setInterestingSex,
  };

  return (
    <SignUpAppContext.Provider value={contextValue}>
      {children}
    </SignUpAppContext.Provider>
  );
};

export { SignUpAppContext, SignUpAppContextProvider };
