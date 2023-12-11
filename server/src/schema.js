const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Asset {
    id: ID!
    device: String!
    serialnumber: String
    description: String!
    assignee: String!
    location: String!
    companyId: String!
    createdAt: String!
    updatedAt: String!
  }

  type Company {
    id: ID!
    name: String!
    description: String!
    createdAt: String!
    updatedAt: String!
    assets: [Asset]
  }
  type AuthData {
    id: ID!
    token: String!
    user: User
  }

  type Query {
    #User
    user(id: ID!): User
    users: [User]
    checkAuth: AuthData

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
    login(email: String!, password: String!): AuthData
    logout: String!
    deleteUser(id: ID!): String
    updateUser(id: ID!, username: String, email: String, password: String): User

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
    deleteAsset(id: ID!): String

    # Company Mutations
    createCompany(name: String!, description: String): Company!
    deleteCompany(id: ID!): String
  }
`;

module.exports = typeDefs;
