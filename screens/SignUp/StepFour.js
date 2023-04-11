import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AuthButton from "../../components/auth/AuthButton";
import styled from "styled-components/native";
import { colors } from "../../colors";
import StepBar from "./StepBar";

const BtnContainer = styled.View`
  width: 80%;
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 100px;
`;

const IconContainer = styled.View`
  flex: 4;
  align-items: center;
  width: 100%;
`;

const SkipTouchableOpacity = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${colors.green};
  border-radius: 3px;
  padding: 15px 10px;
`;

const SkipLink = styled.Text`
  color: ${colors.green};
  font-weight: 600;
  text-align: center;
`;

const ExplainText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 25px;
  margin-bottom: 10px;
  align-self: baseline;
`;

const SubExplainText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 15px;
  margin-bottom: 10px;
  align-self: baseline;
`;

const RemoveIconTouchable = styled.TouchableOpacity`
  z-index: 2;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  margin-top: 5px;
  align-items: center;
`;

export default function StepFour({ navigation }) {
  const [avatar, setAvatar] = useState(null);

  const handleRemoveAvatar = () => {
    console.log("default");
    setAvatar(null);
  };

  const handleNext = (nextPage) => {
    navigation.navigate(nextPage);
  };

  const HeaderBar = () => (
    <StepBar
      navigation={navigation}
      currentStep={4}
      style={{ marginBottom: 100, flex: 1 }}
      onBeforeNavigate={handleNext}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderBar,
    });
  }, []);

  const handleAvatarPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <IconContainer>
        <ExplainText>Add Your Profile Picture</ExplainText>
        <SubExplainText>
          Adding a face picture lets other users recognize you better. Your
          profile picture will be shown to everybody
        </SubExplainText>
        <TouchableOpacity onPress={handleAvatarPress}>
          <View
            style={{
              height: 200,
              width: 200,
              borderRadius: 175,
              backgroundColor: "gray",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              marginTop: 15,
              zindex: 0,
            }}
          >
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                style={{ height: 200, width: 200, backgroundColor: "blue" }}
              />
            ) : (
              <Ionicons name="person" size={80} color="white" />
            )}
          </View>
        </TouchableOpacity>
        {avatar && (
          <RemoveIconTouchable onPress={handleRemoveAvatar}>
            <Ionicons name="close-circle" size={40} color="white" />
          </RemoveIconTouchable>
        )}
      </IconContainer>

      <BtnContainer>
        <AuthButton
          text={avatar ? "Create Account" : "Add Picture"}
          onPress={avatar ? handleAvatarPress : handleAvatarPress}
        />
        <SkipTouchableOpacity
          onPress={avatar ? handleAvatarPress : handleAvatarPress}
        >
          <SkipLink>{avatar ? "Edit Photo" : "Skip"}</SkipLink>
        </SkipTouchableOpacity>
      </BtnContainer>
    </View>
  );
}
