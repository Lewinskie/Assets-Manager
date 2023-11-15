const createAdmin = async (models) => {
  const admin = await models.User.findOne({
    where: { role: "admin" },
  });

  if (!admin) {
    await models.User.create({
      username: "admin",
      password: "5ZBWG@Dragon",
      role: "admin",
    });
  }
};

module.exports = { createAdmin };
