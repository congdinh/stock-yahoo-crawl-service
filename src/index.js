import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typeDef";
import resolvers from "./graphql/resolver";

require("dotenv").config();

async function start() {
  // In the most basic sense, the ApolloServer can be started
  // by passing type definitions (typeDefs) and the resolvers
  // responsible for fetching the data for those types.
  const server = new ApolloServer({ typeDefs, resolvers });

  // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.
  const port = parseInt(process.env.PORT || process.env.SERVER_PORT, 10);

  server.listen(port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

start();
