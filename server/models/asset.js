"use strict";

const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    "Asset",
    {
      device: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serialnumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assignee: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
      },
      companyId: {
        type: INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {}
  );
  Asset.associate = function (models) {
    Asset.belongsTo(models.Company, { foreignKey: "companyId", as: "company" });
  };
  Asset.addHook("beforeDestroy", async (asset, options) => {
    await models.BackupAsset.create({
      ...asset.dataValues,
      deletedBy: options.user ? options.user.username : "unknown",
      deletedAt: new Date(),
    });
  });
  return Asset;
};
