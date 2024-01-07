import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { StatusBar, View, useColorScheme } from "react-native";
// import LoggedOutNav from "./navigators/LoggedOutNav";
import * as SplashScreen from "expo-splash-screen";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
// import { isLoggedInVar } from "./apollo";
// import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider, ThemeContext } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import LoggedOutNav from "./navigators/LoggedOutNav";
import LoggedInNav from "./navigators/LoggedInNav";
import { NavigationContainer, DarkTheme } from '@react-navigation/native';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const startLoading = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/glLogo.png"),
      "https://upload.wikimedia.org/w¡ikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png",
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  const preload = async ()=> {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      console.log("token : ", token);
      isLoggedInVar(true);
      tokenVar(token);
    }
    return startLoading();
  };



  useEffect(() => {
    async function prepare() {
      try {
        await preload();
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);

        /// temp !!!!  ///
        // console.log("pk");
        // isLoggedInVar(false);
        // tokenVar("");
        //////////////////
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  const isDark = useColorScheme() === "dark";

  if (!ready) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar hidden={false} />
          <NavigationContainer theme={DarkTheme}>
            {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
          </NavigationContainer>
        </View>
      </ThemeProvider>
    </ApolloProvider>
  );
}
