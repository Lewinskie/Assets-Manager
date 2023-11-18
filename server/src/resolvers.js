const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    // Users
    async register(_, { username, email, password }, { models }) {
      return models.User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });
    },
    async login(_, { email, password }, { models, secret }) {
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Invalid Password or Email");
      }
      const token = jwt.sign({ userId: user.id }, secret);
      return {
        token,
        user,
      };
    },
    async logout(_, __, { req, res }) {
      // Clear the user session or token on logout
      res.clearCookie("token");
      return "User successfully logged out";
    },

    // Assets
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
    async updateAsset(
      _,
      { id, device, description, serialnumber, assignee, location },
      { models }
    ) {
      const [updatedRowsCount, [updatedAsset]] = await models.Asset.update(
        {
          device,
          description,
          serialnumber,
          assignee,
          location,
        },
        { returning: true, where: { id } }
      );
      if (updatedRowsCount === 0) {
        throw new Error("No asset with that ID found");
      }
      return updatedAsset;
    },

    // Company
    async createCompany(_, { name }, { models }) {
      return models.Company.create({ name });
    },

    async deleteCompany(_, { id }, { models }) {
      await models.Company.destroy({ where: { id } });
      return "Company deleted successfully";
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