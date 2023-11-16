const { User, Asset, Company } = require("../lib/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
  createUser: async ({ username, email, password }) => {
    console.log("Creating user...", { username, email, password });

    try {
      const user = await User.create({ username, email, password });
      console.log("User created:", user);
      return user;
    } catch (error) {
      console.error("User creation failed:", error);
      throw new Error("User creation failed");
    }
  },
  users: async () => {
    try {
      console.log("Getting all users...");
      return await User.findAll();
    } catch (error) {
      console.error("Trouble getting users", error);
      throw new Error("Fetching users failed");
    }
  },
  // user: async (_, { email }) => {
  //   try {
  //     console.log(`Looking for ${email}...`);
  //     let user = await User.findOne({ where: { email } });
  //     if (!user) {
  //       throw new Error("User not found");
  //     } else {
  //       return user;
  //     }
  //   } catch (err) {
  //     console.error("Error finding user", err);
  //     throw new Error("Failed to find user");
  //   }
  // },

  // companies: async () => {
  //   return await Company.findAll({ include: Asset });
  // },

  // createCompany: async ({ name }) => {
  //   return await Company.create({ name });
  // },
  // createAsset: async ({ device, description, serialNumber, assignee }) => {
  //   return await Asset.create({
  //     device,
  //     description,
  //     serialNumber,
  //     assignee,
  //   });
  // },

  // register: async ({ name, email, password }) => {
  //   const user = await User.create({ name, email, password });
  //   const token = jwt.sign({ userId: user.id }, "secret_key", {
  //     expiresIn: "1h",
  //   });
  //   return { token, user };
  // },

  // login: async ({ email, password }) => {
  //   const user = await User.findOne({ where: { email } });
  //   if (!user) {
  //     throw new Error("User not found");
  //   }
  //   const validPassword = await bcrypt.compare(password, user.password);
  //   if (!validPassword) {
  //     throw new Error("Invalid Password!");
  //   }
  //   const token = jwt.sign({ userId: user.id }, "secret_key", {
  //     expiresIn: "1h",
  //   });
  //   return { token, user };
  // },
};
module.exports = resolvers;
