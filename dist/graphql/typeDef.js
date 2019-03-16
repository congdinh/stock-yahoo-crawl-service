"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  # Comments in GraphQL are defined with the hash (#) symbol.\n\n  # This \"Historical\" type can be used in other type declarations.\n  type StockExchangeHistory {\n    open: Float\n    high: Float\n    low: Float\n    close: Float\n    volume: Float\n    adjClose: Float\n    time: String\n  }\n\n  type StockExchange {\n    symbol: String\n    histories: [StockExchangeHistory]\n  }\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  # (A \"Mutation\" type will be covered later on.)\n  type Query {\n    stockHistorical(\n      symbol: String\n      from: String\n      to: String\n      period: String\n    ): StockExchange\n    stockExchangeIntraday(symbol: String, interval: String): StockExchange\n    stockExchangeExtraday(symbol: String, type: String): StockExchange\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
var _default = (0, _apolloServer.gql)(_templateObject());

exports.default = _default;