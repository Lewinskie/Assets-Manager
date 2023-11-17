const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }
  type Asset {
    id: ID!
    device: String!
    serialnumber: String
    description: String!
    assignee: String!
    location: String!
    companyId: String!
  }

  type Company {
    id: ID!
    name: String!
    assets: [Asset]
  }

  type Query {
    user(id: ID!): User
    users: [User]
    companies: [Company]
    company(id: ID!): Company
    assets: [Asset]
    asset(id: ID!): Asset
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    createAsset(
      companyId: String!
      device: String!
      description: String!
      serialnumber: String!
      assignee: String!
      location: String!
    ): Asset!
    createCompany(name: String!): Company!
  }
`;

module.exports = typeDefs;
