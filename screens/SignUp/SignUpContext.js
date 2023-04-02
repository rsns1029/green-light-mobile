import React, { useState } from "react";

const SignUpAppContext = React.createContext();

const SignUpAppContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [reservedUsername, setReservedUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

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
  };

  return (
    <SignUpAppContext.Provider value={contextValue}>
      {children}
    </SignUpAppContext.Provider>
  );
};

export { SignUpAppContext, SignUpAppContextProvider };
