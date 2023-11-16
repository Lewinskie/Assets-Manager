const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const asset = require("./models/asset");
const company = require("./models/company");
const user = require("./models/user");
const { sequelize } = require("./lib/db");

// THIS IS THE ENTRY POINT FOR MY BACKEND
const models = { asset, company, user };
// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
});

// Create an Express App
const app = express();

// Enable cors
app.use(cors());

// Start the Apollo Server
async function startServer() {
  try {
    await server.start();

    // Apply the Apollo Server middleware to the Express app
    server.applyMiddleware({ app });

    // Start the Express server
    const PORT = process.env.PORT;

    // Authenticate with the database
    try {
      await sequelize.authenticate();
      console.log(
        "Connection to the database has been established successfuly"
      );
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}/graphql
    `);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

// Call the function to start the server
startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
