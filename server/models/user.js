module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    //Username
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // unique: true
    },
    //Password
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    //Role
    role: {
      type: DataTypes.ENUM(["admin", "user"]),
      defaultValue: "user",
    },
  });
  return User;
};
