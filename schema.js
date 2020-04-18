const { gql } = require('apollo-server-express');

export default gql`
  type AuthPayload {
    user: User
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    currentUser: User
    hello: String
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    signup(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): AuthPayload
    logout: Boolean
  }
`;
