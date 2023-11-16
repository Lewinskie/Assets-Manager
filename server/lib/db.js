const { Sequelize } = require("sequelize");
const UserModel = require("../models/user");
const CompanyModel = require("../models/company");
const AssetModel = require("../models/asset");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = UserModel(sequelize);
const Company = CompanyModel(sequelize);
const Asset = AssetModel(sequelize);

// Define relationships between models
Company.hasMany(Asset);
Asset.belongsTo(Company);

module.exports = {
  sequelize,
  User,
  Company,
  Asset,
};
