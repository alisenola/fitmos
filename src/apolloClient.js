import ApolloClient, { createNetworkInterface } from 'apollo-client';

// GraphQL connection
const networkInterface = createNetworkInterface(
  'https://api.scaphold.io/graphql/a03c98dd-74b3-485c-bb6f-8129a85ee5cd'
);

// Apollo client
const client = new ApolloClient({
  networkInterface,
});

export default client;
