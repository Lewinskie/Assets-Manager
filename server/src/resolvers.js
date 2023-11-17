const bcrypt = require("bcryptjs");

const resolvers = {
  Query: {
    async user(_, { id }, { models }) {
      return models.User.findByPk(id);
    },
    async users(_, __, { models }) {
      return await models.User.findAll();
    },
    async companies(_, __, { models }) {
      return models.Company.findAll();
    },
    async company(_, { id }, { models }) {
      return models.Company.findByPk(id);
    },
    async assets(_, __, { models }) {
      return models.Asset.findAll();
    },
  },
  Mutation: {
    async createUser(_, { username, email, password }, { models }) {
      return models.User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });
    },
    async createAsset(
      _,
      { companyId, device, description, serialnumber, assignee, location },
      { models }
    ) {
      return models.Asset.create({
        companyId,
        device,
        description,
        serialnumber,
        assignee,
        location,
      });
    },
    async createCompany(_, { name }, { models }) {
      return models.Company.create({ name });
    },
  },
  Company: {
    async assets(parent, __, { models }) {
      return models.Asset.findAll({
        where: { companyId: parent.id },
      });
    },
  },
};

module.exports = resolvers;
