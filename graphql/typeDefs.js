const gql = require('graphql-tag');

module.exports = gql`
  input RegisterInput {
    email: String!,
    phone: String!,
    countryCode: String!
  }
  type User {
    id: ID!,
    email: String!,
    phone: String!,
    token: String!,
    createdAt: String!
  }
  type Query{
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(phone: String!): User!
  }
`