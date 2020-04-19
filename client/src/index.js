import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './components/App';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React from 'react';
import ReactDOM from 'react-dom';
import { createHttpLink } from 'apollo-link-http';

const uri = 'http://localhost:3001/graphql';

const httpLink = createHttpLink({ uri });

// const middlewareAuthLink = new ApolloLink((operation, forward) => {
//   const token =
//     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiODQ2YzgxOGMtM2IxYi00ZmM3LThkZDItNjQxYjU1YTdiYWY5In0.17xeTnclFL2y8hXxUkWfuWOdOwQ4QD_bVbqmOYFFQjI';

//   const authorizationHeader = token ? `Bearer ${token}` : null;
//   operation.setContext({
//     headers: {
//       authorization: authorizationHeader,
//     },
//   });
//   return forward(operation);
// });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
