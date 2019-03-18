"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _apolloServer = require("apollo-server");

var _winston = _interopRequireDefault(require("./external-libs/winston"));

var _mongoose = require("./external-libs/mongoose");

var _typeDef = _interopRequireDefault(require("./graphql/typeDef"));

var _resolver = _interopRequireDefault(require("./graphql/resolver"));

require("dotenv").config();

function start() {
  // In the most basic sense, the ApolloServer can be started
  // by passing type definitions (typeDefs) and the resolvers
  // responsible for fetching the data for those types.
  var server = new _apolloServer.ApolloServer({
    typeDefs: _typeDef.default,
    resolvers: _resolver.default
  }); // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.

  var port = parseInt(process.env.PORT || process.env.SERVER_PORT, 10);
  server.listen(port).then(function (_ref) {
    var url = _ref.url;

    _winston.default.info("\uD83D\uDE80  Server ready at ".concat(url));
  });
}

(0, _mongoose.connect)().then(function () {
  var host = process.env.MONGO_DEFAULT_HOST;
  var port = process.env.MONGO_DEFAULT_PORT;
  var dbName = process.env.MONGO_DEFAULT_DB_NAME;

  _winston.default.info("Mongo|Started mongodb://".concat(host, ":").concat(port, "/").concat(dbName));

  start();
}).catch(function (error) {
  _winston.default.error(error);
});