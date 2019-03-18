import { ApolloServer } from "apollo-server";
import logger from "./external-libs/winston";
import { connect as connectMongoDB } from "./external-libs/mongoose";
import typeDefs from "./graphql/typeDef";
import resolvers from "./graphql/resolver";

require("dotenv").config();

function start() {
  // In the most basic sense, the ApolloServer can be started
  // by passing type definitions (typeDefs) and the resolvers
  // responsible for fetching the data for those types.
  const server = new ApolloServer({ typeDefs, resolvers });

  // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.
  const port = parseInt(process.env.PORT || process.env.SERVER_PORT, 10);

  server.listen(port).then(({ url }) => {
    logger.info(`🚀  Server ready at ${url}`);
  });
}

connectMongoDB()
  .then(() => {
    const host = process.env.MONGO_DEFAULT_HOST;
    const port = process.env.MONGO_DEFAULT_PORT;
    const dbName = process.env.MONGO_DEFAULT_DB_NAME;
    logger.info(`Mongo|Started mongodb://${host}:${port}/${dbName}`);
    start();
  })
  .catch(error => {
    logger.error(error);
  });
