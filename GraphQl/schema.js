const { gql } = require('graphql-tag');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
  }

  type SignupResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    signup(input: SignupInput!): SignupResponse!
  }
`;
