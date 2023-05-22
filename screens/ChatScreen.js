import React from "react";
import MessagesNav from "../navigators/MessagesNav";

export default function ChatsScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarIcon: ({ focused, color, size }) => (
        <TabIcon
          iconName={"chatbox-ellipses"}
          color={color}
          focused={focused}
        />
      ),
      tabBarOnPress: () => {
        navigation.navigate("Messages");
      },
    });
  }, [navigation]);

  return <MessagesNav screenName="Rooms" />;
}
