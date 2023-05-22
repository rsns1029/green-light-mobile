import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async (token) => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
};

const uploadHttpLink = createUploadLink({
  // uri : "https://instaclone-backend-hm.herokuapp.com/graphql",
  //        https://greenlight-backend-hm.herokuapp.com/graphql
  uri: "https://ed89-221-143-244-19.ngrok-free.app/graphql",
});

// const wsLink = new WebSocketLink({
//   uri: "ws://7cfe-221-143-244-19.ngrok-free.app/graphql",
//   options: {
//     lazy: true,
//     reconnect: true,
//     timeout: 30000,
//     connectionParams: () => ({
//       token: tokenVar(),
//     }),
//   },
// });

// const wsLink = new WebSocketLink(
//   new SubscriptionClient("ws://7cfe-221-143-244-19.ngrok-free.app/graphql", {
//     reconnect: true,
//     connectionParams: () => ({
//       token: tokenVar(),
//     }),
//   })
// );

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://ed89-221-143-244-19.ngrok-free.app/graphql",
    connectionParams: () => {
      return {
        token: tokenVar(),
      };
    },
  })
);

// wsLink.subscriptionClient.on("connecting", () => {
//   console.log("WebSocketLink is connecting...");
// });

// wsLink.subscriptionClient.on("connected", () => {
//   console.log("WebSocketLink is connected.");
// });

// wsLink.subscriptionClient.on("reconnecting", () => {
//   console.log("WebSocketLink is reconnecting...");
// });

// wsLink.subscriptionClient.on("disconnected", () => {
//   console.log("WebSocketLink is disconnected... ");
// });

// wsLink.subscriptionClient.on("error", (error) => {
//   console.log(`WebSocketLink error: ${error.message}`);
// });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // seeFeed: offsetLimitPagination(),  //handles pagination by apollo
      },
    },
    User: {
      keyFields: ["id"], // Ensure User objects have an ID
    },
    // Message: {
    //   fields: {
    //     user: {
    //       merge(existing, incoming) {
    //         return { ...existing, ...incoming };
    //       },
    //     },
    //   },
    // },
  },
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinks
);

const client = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
