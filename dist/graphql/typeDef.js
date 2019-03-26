"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  # Comments in GraphQL are defined with the hash (#) symbol.\n\n  # This \"Historical\" type can be used in other type declarations.\n  type StockExchangeHistory {\n    open: Float\n    high: Float\n    low: Float\n    close: Float\n    volume: Float\n    adjClose: Float\n    date: String\n    ticker: String\n    name: String\n  }\n\n  type StockExchange {\n    ticker: String\n    histories: [StockExchangeHistory]\n  }\n\n  type GlobalRealtime {\n    symbol: String\n    marketTime: Int\n    updateAt: String\n    exchangeTimezoneName: String\n    tradeable: Boolean\n    regularMarketTime: GlobalRaw\n    fiftyTwoWeekLow: GlobalRaw\n    regularMarketPreviousClose: GlobalRaw\n    regularMarketOpen: GlobalRaw\n    regularMarketVolume: GlobalRaw\n    averageDailyVolume3Month: GlobalRaw\n    regularMarketPrice: GlobalRaw\n    regularMarketChange: GlobalRaw\n    regularMarketChangePercent: GlobalRaw\n  }\n\n  type GlobalRaw {\n    raw: String\n    fmt: String\n    longFmt: String\n  }\n\n  type StockGlobalRealtime {\n    data: [GlobalRealtime]\n  }\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  # (A \"Mutation\" type will be covered later on.)\n  type Query {\n    stockHistorical(\n      \"\"\"\n      Symbol of stock/exchange\n      \"\"\"\n      ticker: String!\n      \"\"\"\n      From date default today\n\n      daily: YYYY-MM-DD\n\n      intraday: YYYY-MM-DD HH:mm:ss\n      \"\"\"\n      from: String\n      \"\"\"\n      To date default today\n\n      daily: YYYY-MM-DD\n\n      intraday: YYYY-MM-DD HH:mm:ss\n      \"\"\"\n      to: String\n      \"\"\"\n      Intraday or daily(default)\n      \"\"\"\n      type: String\n      \"\"\"\n      Boolean: true(default)\n      \"\"\"\n      exchange: Boolean\n    ): StockExchange\n    stockHistoryLatest(\n      \"\"\"\n      Symbol of stock/exchange\n      \"\"\"\n      ticker: String!\n      \"\"\"\n      Intraday or daily(default)\n      \"\"\"\n      type: String\n      \"\"\"\n      Boolean: true(default)\n      \"\"\"\n      exchange: Boolean\n    ): StockExchangeHistory\n    stockGlobalRealtime(symbols: [String!]): StockGlobalRealtime\n  }\n"]);

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