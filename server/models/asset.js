module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define("Asset", {
    //id
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Device
    device: { type: DataTypes.STRING, allowNull: false },

    // Description
    description: { type: DataTypes.TEXT, allowNull: false },

    //Serial Number
    serialNumber: { type: DataTypes.STRING, allowNull: false },

    //Assignee
    assignee: { type: DataTypes.STRING, allowNull: false },
  });
  return Asset;
};
