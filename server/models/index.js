const { Sequelize, DataTypes } = require("sequelize");
const CompanyModel = require("./company");
const AssetModel = require("./asset");
const UserModel = require("./user");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const Company = CompanyModel(sequelize, DataTypes);
const Asset = AssetModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

Company.hasMany(Asset);
Asset.belongsTo(Company);

module.exports = { sequelize, Company, Asset, User };
