import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const AvatarImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: 10px;
`;

const IconContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: grey;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

export default function Avatarimg({ avatarPath }) {
  return avatarPath ? (
    <AvatarImage source={{ uri: avatarPath }} />
  ) : (
    <IconContainer>
      <Ionicons name="person" size={32} color="#ffffff" />
    </IconContainer>
  );
}
