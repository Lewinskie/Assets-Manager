const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql/schema");
const models = require("./models");
const { createAdmin } = require("./utils/initialData");
const { configurePassport } = require("./auth/passport");

// THIS IS THE ENTRY POINT FOR MY BACKEND

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers, context: { models } });

// Create an Express App
const app = express();

// use Express-session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 1000, // 1 day
    },
  })
);
// Initialize passport
configurePassport(passport);

// Apply Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// Enable cors
app.use(cors());

// Use security headers
// app.use(helmet());

// Start the Apollo Server
async function startServer() {
  await server.start();

  // Apply the Apollo Server middleware to the Express app
  server.applyMiddleware({ app });

  // Start the Express server
  const PORT = process.env.PORT;

  // Authenticate with the database
  try {
    await models.sequelize.authenticate();
    console.log("Connection to the database has been established successfuly");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  // Create an admin and initial data if not present

  await createAdmin(models);
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}/graphql/
    `);
  });
}

// Call the function to start the server
startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
