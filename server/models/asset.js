const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Asset", {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    device: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    assignee: {
      type: DataTypes.STRING,

      allowNull: false,
    },
  });
};
