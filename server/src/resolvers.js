const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generate-token");
const { Op } = require("sequelize");

const resolvers = {
  Query: {
    async users(_, __, { models }) {
      return await models.User.findAll();
    },
    async user(_, { id }, { models }) {
      return await models.User.findByPk(id);
    },

    async checkAuth(_, __, { models, req }) {
      try {
        const userId = req.id;

        if (!userId) {
          throw new Error("User not authenticated");
        }
        const user = await models.User.findByPk(userId);
        if (!user) {
          throw new Error("User not found");
        }
        const token = generateToken(user);

        return {
          id: user.id,
          token,
          user: {
            username: user.username,
            email: user.email,
          },
        };
      } catch (error) {
        throw new Error("Authentication failed");
      }
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
    async asset(_, { id }, { models }) {
      return models.Asset.findByPk(id);
    },
  },
  Mutation: {
    // Users
    async register(_, { username, email, password }, { models }) {
      const user = models.User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });
      return user;
    },
    async login(_, { email, password }, { models }) {
      const user = await models.User.findOne({
        where: { email: { [Op.like]: email } },
      });
      if (!user) {
        throw new Error("Invalid Email or Password");
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error("Invalid Email or Password ");
      }
      // Generate Token
      const token = generateToken(user);

      return {
        id: user.id,
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      };
    },
    async logout(_, __, { req, res }) {
      // Clear the user session or token on logout
      res.clearCookie("token");
      // if (typeof localStorage !== "undefined") {
      //   localStorage.removeItem("authToken", "user");
      // }
      return "User successfully logged out";
    },
    async deleteUser(_, { id }, { models }) {
      const user = await models.User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await models.User.destroy({ where: { id } });
      return `User with ID ${id} deleted successfully`;
    },
    async updateUser(_, { id, username, email, password }, { models }) {
      const [updatedRowsCount, [updatedUser]] = await models.User.update(
        {
          username,
          email,
          password,
        },
        {
          returning: true,
          where: { id },
        }
      );
      if (updatedRowsCount === 0) {
        throw new Error("User not found");
      }
      return updatedUser;
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
    async deleteAsset(_, { id }, { models }) {
      const deletedAsset = await models.Asset.findByPk(id);
      if (!deletedAsset) {
        throw new Error("Asset not found");
      }
      await models.Asset.destroy({ where: { id } });
      return `Asset with ID Deleted ${deletedAsset}`;
    },

    // Company
    async createCompany(_, { name, description }, { models }) {
      return models.Company.create({ name, description });
    },

    async deleteCompany(_, { id }, { models }) {
      // Delete associated assets first
      await models.Asset.destroy({ where: { companyId: id } });

      // Now delete the company
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
