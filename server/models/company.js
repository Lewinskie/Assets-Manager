module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define("Company", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
    },
  });
  // Associations
  Company.associate = (models) => {
    models.Company.hasMany(models.Asset, { foreignKey: "companyId" });
  };
  return Company;
};
