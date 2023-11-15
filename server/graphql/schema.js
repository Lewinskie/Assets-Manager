const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # type Company
  type Company {
    id: ID!
    name: String!
    assets: [Asset]
  }

  # type Asset
  type Asset {
    id: ID!
    companyId: ID!
    device: String!
    description: String!
    serialNumber: String!
    assignee: String!
  }

  #type Query
  type Query {
    companies: [Company]
    company(id: ID!): Company
    assets: [Asset]
    asset(id: ID!): Asset
  }

  # type Mutation
  type Mutation {
    addCompany(name: String!): Company
    deleteCompany(id: ID!): Boolean
    addAsset(
      device: String!
      description: String!
      serialNumber: String!
      assignee: String!
      companyId: ID!
    ): Asset
    deleteAsset(id: ID!): Boolean
    updateAsset(
      id: ID!
      device: String
      description: String
      serialNumber: String
      assignee: String
      companyId: ID!
    ): Asset
  }
`;

const resolvers = {
  Query: {
    companies: async (_, __, { models }) => {
      return await models.Company.findAll();
    },
    company: async (_, { id }, { models }) => {
      return await models.Company.findByPk(id, { include: models.Asset });
    },
    assets: async (_, __, { models }) => {
      return await models.Asset.findAll({ include: models.Company });
    },
    asset: async (_, { id }, { models }) => {
      return await models.Asset.findOne({ where: { id } });
    },
  },
  Mutation: {
    addCompany: async (_, { name }, { models }) => {
      return models.Company.create({ name });
    },
    deleteCompany: async (_, { id }, { models }) => {
      const company = await models.Company.findByPk(id);
      if (!company) return false;
      await company.destroy();
      return true;
    },
    addAsset: async (
      _,
      { device, description, serialNumber, assignee, companyId },
      { models }
    ) => {
      return models.Asset.create({
        device,
        description,
        serialNumber,
        assignee,
        companyId,
      });
    },
    deleteAsset: async (_, { id }, { models }) => {
      const asset = await models.Asset.findByPk(id);
      if (!asset) return false;
      await asset.destroy();
      return true;
    },
  },
};

module.exports = { typeDefs, resolvers };
