"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlobalRealtime = exports.getHistoryLatest = exports.getStockHistorical = void 0;

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
                $gte: from ? (0, _moment.default)(from) : (0, _moment.default)().startOf("day"),
                $lte: to ? (0, _moment.default)(to) : (0, _moment.default)().endOf("day")
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

var getHistoryLatest =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_ref4) {
    var ticker, _ref4$type, type, _ref4$exchange, exchange, query, histories;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ticker = _ref4.ticker, _ref4$type = _ref4.type, type = _ref4$type === void 0 ? "daily" : _ref4$type, _ref4$exchange = _ref4.exchange, exchange = _ref4$exchange === void 0 ? true : _ref4$exchange;
            query = {
              ticker: ticker,
              type: type,
              exchange: exchange
            };
            _context2.next = 4;
            return _models.Historical.findOne(query).sort({
              date: -1
            }).lean().exec();

          case 4:
            histories = _context2.sent;
            return _context2.abrupt("return", histories);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getHistoryLatest(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getHistoryLatest = getHistoryLatest;

var getGlobalRealtime =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_ref6) {
    var symbols, listQuery, data, result;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            symbols = _ref6.symbols;
            listQuery = symbols.map(function (item) {
              return _models.Global.findOne({
                symbol: item
              }).sort({
                updateAt: -1
              });
            });
            _context3.next = 4;
            return Promise.all(listQuery);

          case 4:
            data = _context3.sent;
            result = data.filter(function (i) {
              return i;
            });
            return _context3.abrupt("return", {
              data: result
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getGlobalRealtime(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getGlobalRealtime = getGlobalRealtime;