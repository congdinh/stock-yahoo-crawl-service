"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _service = require("./service");

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
var _default = {
  Query: {
    stockHistorical: function stockHistorical(_, args) {
      return (0, _service.getStockHistorical)((0, _objectSpread2.default)({}, args));
    },
    stockExchangeIntraday: function stockExchangeIntraday(_, args) {
      return (0, _service.getStockExchangeIntraday)((0, _objectSpread2.default)({}, args));
    },
    stockExchangeExtraday: function stockExchangeExtraday(_, args) {
      return (0, _service.getStockExchangeExtraday)((0, _objectSpread2.default)({}, args));
    }
  }
};
exports.default = _default;