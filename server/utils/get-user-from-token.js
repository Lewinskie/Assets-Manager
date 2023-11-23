const jwt = require("jsonwebtoken");
const { User } = require("../models/user"); //

const secretKey = "your_secret_key";

const getUserFromToken = async (token) => {
  try {
    if (!token) {
      return null;
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, secretKey);

    // Fetch the user from the database using the decoded user ID
    const user = User.findByPk(decoded.id);

    return user || null; // Return the user or null if not found
  } catch (error) {
    // Token is invalid or expired
    console.error("Error decoding token:", error);
    return null;
  }
};

module.exports = { getUserFromToken };
