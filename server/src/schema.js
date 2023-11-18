const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }
  type AuthPayload {
    token: String!
    user: User!
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
    #User
    user(id: ID!): User
    users: [User]

    # Company
    companies: [Company]
    company(id: ID!): Company

    # Asset
    assets: [Asset]
    asset(id: ID!): Asset
  }

  type Mutation {
    # User Mutations
    register(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
    logout: String!

    # Asset Mutations
    createAsset(
      companyId: String!
      device: String!
      description: String!
      serialnumber: String!
      assignee: String!
      location: String!
    ): Asset!
    updateAsset(
      id: ID!
      device: String!
      description: String!
      serialnumber: String
      assignee: String
      location: String
    ): Asset
    deleteAsset(id: ID!): String!

    # Company Mutations
    createCompany(name: String!): Company!
    deleteCompany(id: ID!): String!
  }
`;

module.exports = typeDefs;
