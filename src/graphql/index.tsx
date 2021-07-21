import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

// --------- queries---------- //

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`Graphql error ${message}`);
      console.log(locations);
      console.log(`Graphql path ${path}`);
    });
  }
  if (networkError) {
    console.log(networkError);
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: "http://13.233.101.71:8000/subgraphs/name/hansrajrami/erc721",
  }),
]);

const decentralandLink = from([
  errorLink,
  new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/decentraland/marketplace",
  }),
]);

export const client = new ApolloClient({
  //   uri: "http://13.233.101.71:8000/subgraphs/name/hansrajrami/erc721",
  cache: new InMemoryCache(),
  link: decentralandLink,
});
