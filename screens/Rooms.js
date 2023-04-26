import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, View, Text } from "react-native";
import RoomItem from "../components/rooms/RoomItem";
import ScreenLayout from "../components/ScreenLayout";
import { MATCH_FRAGMENT, ROOM_FRAGMENT } from "../fragments";
import styled from "styled-components/native";
import HList from "../components/users/HList";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

const SEE_MATCHES_QUERY = gql`
  query seeMatches {
    seeMatches {
      ...MatchParts
    }
  }
  ${MATCH_FRAGMENT}
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

export default function Rooms() {
  console.log("see room 1 : ");

  const { daata: chatData, loading } = useQuery(SEE_ROOMS_QUERY, {
    fetchPolicy: "network-only",
  });

  const { data: matchData, loading: matchLoading } = useQuery(
    SEE_MATCHES_QUERY,
    { fetchPolicy: "network-only" }
  );

  console.log("matchData : ", matchData?.seeMatches);

  const renderItem = ({ item: room }) => <RoomItem {...room} />;
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ListHeaderComponent={
          <>
            {matchLoading ? null : matchData?.seeMatches ? (
              <HList title={"Matches"} data={matchData.seeMatches} />
            ) : null}
            <ListTitle>Chats</ListTitle>
          </>
        }
        ItemSeparatorComponent={
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          ></View>
        }
        style={{ width: "100%" }}
        data={chatData?.seeRooms}
        keyExtractor={(room) => "" + room.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
