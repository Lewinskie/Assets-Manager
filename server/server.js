const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
// const typeDefs = require('./path-to-your-schema'); // Replace with the path to your GraphQL schema
// const resolvers = require('./path-to-your-resolvers'); // Replace with the path to your GraphQL resolvers
const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world",
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Create an Express App
const app = express();

// Start the Apollo Server
async function startServer() {
  await server.start();

  // Apply the Apollo Server middleware to the Express app
  server.applyMiddleware({ app });

  // Start the Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}/graphql`);
  });
}

// Call the function to start the server
startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
