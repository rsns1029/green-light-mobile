import {
  gql,
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import useMe from "../hooks/useMe";
import { useCallback } from "react";

const NEW_MESSAGE_FRAGMENT = gql`
  fragment NewMessage on Message {
    id
    payload
    user {
      id
      username
      avatar
    }
    read
  }
`;

const ROOM_UPDATES = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      user {
        id
        username
        avatar
      }
      read
    }
  }
`;

const READ_MESSAGE_MUTATION = gql`
  mutation readMessage($id: Int!) {
    readMessage(id: $id) {
      ok
      error
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
        id
        payload
        user {
          id
          username
          avatar
        }
        read
      }
    }
  }
`;

const MessageContainer = styled.View`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
`;
const Author = styled.View``;

const Avatar = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 25px;
`;

const IconContainer = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 25px;
  background-color: grey;
  justify-content: center;
  align-items: center;
`;

const Message = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 16px;
  margin: 0px 10px;
`;
const TextInput = styled.TextInput`
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  color: white;
  border-radius: 1000px;
  width: 90%;
  margin-right: 10px;
`;

const InputContainer = styled.View`
  width: 95%;
  margin-bottom: 50px;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`;

const SendButton = styled.TouchableOpacity``;

export default function Room({ route, navigation }) {
  const { data: meData } = useMe();
  const { register, setValue, handleSubmit, getValues, watch } = useForm();

  const updateSendMessage = (cache, result) => {
    console.log("updateSendMessage");
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (ok && meData) {
      const { message } = getValues();
      setValue("message", "");
      const messageObj = {
        id,
        payload: message,
        user: {
          id: meData.me.id,
          username: meData.me.username,
          avatar: meData.me.avatar,
        },
        read: true,
        __typename: "Message",
      };
      const messageFragment = cache.writeFragment({
        fragment: NEW_MESSAGE_FRAGMENT,
        data: messageObj,
      });

      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            const existingMessage = prev.find(
              (aMessage) => aMessage.__ref === messageFragment.__ref
            );
            if (existingMessage) {
              console.log("mutation but cahce exists");
              console.log(existingMessage);
              return prev;
            }

            return [...prev, messageFragment];
          },
        },
      });
    }
  };
  const [readMessage] = useMutation(READ_MESSAGE_MUTATION);
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );

  const { data, loading, subscribeToMore } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
    fetchPolicy: "network-only",
  });

  const client = useApolloClient();

  const onMessageRead = async (messageId) => {
    try {
      const { data: { readMessage: { ok, error } = {} } = {} } =
        await readMessage({ variables: { id: messageId } });
      if (!ok) {
        console.error(`Failed to mark message as read: ${error}`);
      }
    } catch (error) {
      console.error(`Failed to mark message as read: ${error.message}`);
    }
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    console.log("viewableItems : ", viewableItems);
    viewableItems.forEach(
      ({
        item: {
          id,
          user: { username },
        },
      }) => {
        if (username == route?.params?.talkingTo?.username) {
          // console.log("good ok , : ", username);
          // console.log("not ok , : ", route?.params?.talkingTo?.username);
          onMessageRead(id);
        }
      }
    );
  }, []);

  const updateQuery = (prevQuery, options) => {
    console.log("updateQueory");

    const {
      subscriptionData: {
        data: { roomUpdates: message },
      },
    } = options;

    if (message.id) {
      const messageFragment = client.cache.writeFragment({
        fragment: NEW_MESSAGE_FRAGMENT,
        data: message,
      });
      client.cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            const existingMessage = prev.find(
              (aMessage) => aMessage.__ref === messageFragment.__ref
            );
            if (existingMessage) {
              console.log("existingMessage");
              console.log(existingMessage);
              return prev;
            }
            return [...prev, messageFragment];
          },
        },
      });
    }
  };

  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if (data?.seeRoom && !subscribed) {
      console.log("seeRoom : ", data.seeRoom.messages);
      subscribeToMore({
        document: ROOM_UPDATES,
        variables: {
          id: route?.params?.id,
        },
        updateQuery,
      });
      setSubscribed(true);
    }
  }, [data, subscribed]);

  const onValid = ({ message }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };

  useEffect(() => {
    register("message", { required: true });
  }, [register]);

  useEffect(() => {
    console.log("route : ", route);
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.username}`,
    });
    console.log("set completed");
  }, []);

  const renderItem = ({ item: message }) => (
    <MessageContainer
      outGoing={message.user.username !== route?.params?.talkingTo?.username}
    >
      <Author>
        {message.user.avatar ? (
          <Avatar source={{ uri: message.user.avatar }} />
        ) : (
          <IconContainer>
            <Ionicons name="person" size={15} color="#ffffff" />
          </IconContainer>
        )}
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );
  const messages = [...(data?.seeRoom?.messages ?? [])];
  messages.sort((a, b) => a.id - b.id);
  messages.reverse();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          style={{ width: "100%", marginVertical: 10 }}
          inverted
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          data={messages}
          showsVerticalScrollIndicator={false}
          keyExtractor={(message) => "" + message.id}
          renderItem={renderItem}
          onViewableItemsChanged={onViewableItemsChanged}
        />
        <InputContainer>
          <TextInput
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            placeholder="Write a message..."
            returnKeyLabel="Send Message"
            returnKeyType="send"
            onChangeText={(text) => setValue("message", text)}
            onSubmitEditing={handleSubmit(onValid)}
            value={watch("message")}
          />
          <SendButton
            onPress={handleSubmit(onValid)}
            disabled={!Boolean(watch("message"))}
          >
            <Ionicons
              name="send"
              color={
                !Boolean(watch("message"))
                  ? "rgba(255, 255, 255, 0.5)"
                  : "white"
              }
              size={22}
            />
          </SendButton>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
