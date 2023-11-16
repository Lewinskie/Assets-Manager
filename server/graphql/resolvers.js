const { User, Asset, Company } = require("../lib/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
  users: async () => {
    return await User.findAll();
  },

  companies: async () => {
    return await Company.findAll({ include: Asset });
  },

  createUser: async ({ username, email, password }) => {
    const user = await User.create({ username, email, password });
    return user;
  },
  createCompany: async ({ name }) => {
    return await Company.create({ name });
  },
  createAsset: async ({ device, description, serialNumber, assignee }) => {
    return await Asset.create({
      device,
      description,
      serialNumber,
      assignee,
    });
  },

  register: async ({ name, email, password }) => {
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ userId: user.id }, "secret_key", {
      expiresIn: "1h",
    });
    return { token, user };
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid Password!");
    }
    const token = jwt.sign({ userId: user.id }, "secret_key", {
      expiresIn: "1h",
    });
    return { token, user };
  },
};
module.exports = resolvers;
