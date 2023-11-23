const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("../models");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return { models, secret: "secret_key", req, res };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
