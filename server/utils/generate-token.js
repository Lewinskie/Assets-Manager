const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    "secret-key",
    { expiresIn: "1h" }
  );
  return token;
};
module.exports = { generateToken };
