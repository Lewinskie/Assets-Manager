module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define("Company", {
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
  });
  // Associations
  Company.associate = (models) => {
    models.Company.hasMany(models.Asset, { foreignKey: "companyId" });
  };
  Company.addHook("beforeDestroy", async (company, options) => {
    await models.BackupCompany.create({
      ...company.dataValues,
      deletedBy: options.user ? options.user.username : "unknown",
      deletedAt: new Date(),
    });
  });
  return Company;
};
