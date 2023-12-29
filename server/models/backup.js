"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const BackupAsset = sequelize.define(
    "BackupAsset",
    {
      // Fields similar to Asset Model

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
      deletedBy: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {}
  );
  const BackupUser = sequelize.define(
    "BackupUser",
    {
      // Fields simillar to User Model
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedBy: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {}
  );
  const BackupCompany = sequelize.define(
    "BackupCompany",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedBy: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {}
  );

  // Associations for backup models
  BackupAsset.associate = function (models) {
    BackupAsset.belongsTo(models.BackupCompany, {
      foreignKey: "companyId",
      as: "company",
    });
  };
  BackupCompany.associate = function (models) {
    BackupCompany.hasMany(models.BackupAsset, {
      foreignKey: "companyId",
      as: "assets",
    });
  };
  return { BackupAsset, BackupCompany, BackupUser };
};
