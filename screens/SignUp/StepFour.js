import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function Notifications() {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarPress = async () => {
    // const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    // if (status !== "granted") {
    //   alert("Sorry, we need camera roll permissions to make this work!");
    //   return;
    // }

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
          }}
        >
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={{ height: 200, width: 200 }}
            />
          ) : (
            <Ionicons name="person" size={80} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
