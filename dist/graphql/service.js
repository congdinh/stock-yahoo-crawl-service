"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStockHistorical = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _moment = _interopRequireDefault(require("moment"));

var _models = require("../models");

var getStockHistorical =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref2) {
    var ticker, from, to, _ref2$type, type, _ref2$exchange, exchange, query, histories;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ticker = _ref2.ticker, from = _ref2.from, to = _ref2.to, _ref2$type = _ref2.type, type = _ref2$type === void 0 ? "daily" : _ref2$type, _ref2$exchange = _ref2.exchange, exchange = _ref2$exchange === void 0 ? true : _ref2$exchange;
            query = {
              ticker: ticker,
              type: type,
              exchange: exchange,
              date: {
                $gte: (0, _moment.default)(from),
                $lte: (0, _moment.default)(to)
              }
            };
            _context.next = 4;
            return _models.Historical.find(query).sort({
              date: -1
            }).lean().exec();

          case 4:
            histories = _context.sent;
            return _context.abrupt("return", {
              ticker: ticker,
              histories: histories
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getStockHistorical(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getStockHistorical = getStockHistorical;