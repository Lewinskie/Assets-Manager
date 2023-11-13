const express = require("express");

const { ApolloServer, gql } = require("apollo-server-express");

const app = express();
const port = 4000;

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

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:ocalhost:${port}${server.graphqlPath}`
  )
);
