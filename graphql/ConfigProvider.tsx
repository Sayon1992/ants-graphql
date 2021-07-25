import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {Alert} from 'react-native';

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message}) => {
      Alert.alert(message);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({uri: 'https://guarded-shore-81814.herokuapp.com/graphql'}),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const ConfigProvider = ({children}: any) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ConfigProvider;
