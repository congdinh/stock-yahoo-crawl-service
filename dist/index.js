"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServer = require("apollo-server");

var _typeDef = _interopRequireDefault(require("./graphql/typeDef"));

var _resolver = _interopRequireDefault(require("./graphql/resolver"));

require("dotenv").config();

function start() {
  return _start.apply(this, arguments);
}

function _start() {
  _start = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var server, port;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // In the most basic sense, the ApolloServer can be started
            // by passing type definitions (typeDefs) and the resolvers
            // responsible for fetching the data for those types.
            server = new _apolloServer.ApolloServer({
              typeDefs: _typeDef.default,
              resolvers: _resolver.default
            }); // This `listen` method launches a web-server.  Existing apps
            // can utilize middleware options, which we'll discuss later.

            port = parseInt(process.env.PORT || process.env.SERVER_PORT, 10);
            server.listen(port).then(function (_ref) {
              var url = _ref.url;
              console.log("\uD83D\uDE80  Server ready at ".concat(url));
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _start.apply(this, arguments);
}

start();