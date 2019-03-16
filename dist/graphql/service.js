"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStockExchangeExtraday = exports.getStockExchangeIntraday = exports.getStockHistorical = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _yahooFinance = _interopRequireDefault(require("yahoo-finance"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _moment = _interopRequireDefault(require("moment"));

require("dotenv").config();

var TIME_SERIES_TYPE = {
  intraday: {
    key: "TIME_SERIES_INTRADAY",
    value: ""
  },
  daily: {
    key: "TIME_SERIES_DAILY",
    value: "Time Series (Daily)"
  },
  weekly: {
    key: "TIME_SERIES_WEEKLY",
    value: "Weekly Time Series"
  },
  monthly: {
    key: "TIME_SERIES_MONTHLY",
    value: "Monthly Time Series"
  }
};
var _process$env = process.env,
    yahooEndpoint = _process$env.YAHOO_STOCK_ENDPOINT,
    yahooKey = _process$env.YAHOO_STOCK_KEY;

var getStockHistorical =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref2) {
    var symbol, from, to, _ref2$period, period, data, histories;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            symbol = _ref2.symbol, from = _ref2.from, to = _ref2.to, _ref2$period = _ref2.period, period = _ref2$period === void 0 ? "d" : _ref2$period;
            _context.next = 3;
            return _yahooFinance.default.historical({
              symbol: symbol,
              from: from,
              to: to,
              period: period
            });

          case 3:
            data = _context.sent;
            histories = data.map(function (item) {
              var date = item.date,
                  symbol = item.symbol,
                  newData = (0, _objectWithoutProperties2.default)(item, ["date", "symbol"]);
              return (0, _objectSpread2.default)({}, newData, {
                time: (0, _moment.default)(date).format("YYYY-MM-DD HH:mm:ss")
              });
            });
            return _context.abrupt("return", {
              symbol: symbol,
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

var getStockExchangeIntraday =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_ref4) {
    var symbol, _ref4$interval, interval, dataFetch, stock, dataSeries, histories;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            symbol = _ref4.symbol, _ref4$interval = _ref4.interval, interval = _ref4$interval === void 0 ? "60min" : _ref4$interval;
            _context2.next = 3;
            return (0, _nodeFetch.default)("".concat(yahooEndpoint, "?function=TIME_SERIES_INTRADAY&symbol=").concat(symbol, "&interval=").concat(interval, "&outputsize=full&apikey=").concat(yahooKey), {
              method: "GET",
              headers: {
                Accept: "application/json"
              }
            });

          case 3:
            dataFetch = _context2.sent;
            _context2.next = 6;
            return dataFetch.json();

          case 6:
            stock = _context2.sent;
            dataSeries = stock["Time Series (".concat(interval, ")")];
            histories = Object.keys(dataSeries).map(function (key) {
              var time = key;
              return {
                open: dataSeries[key]["1. open"],
                high: dataSeries[key]["2. high"],
                low: dataSeries[key]["3. low"],
                close: dataSeries[key]["4. close"],
                volume: dataSeries[key]["5. volume"],
                time: time
              };
            });
            return _context2.abrupt("return", {
              symbol: symbol,
              histories: histories
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getStockExchangeIntraday(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getStockExchangeIntraday = getStockExchangeIntraday;

var getStockExchangeExtraday =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_ref6) {
    var symbol, _ref6$type, type, dataFetch, stock, dataSeries, histories;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            symbol = _ref6.symbol, _ref6$type = _ref6.type, type = _ref6$type === void 0 ? "daily" : _ref6$type;
            _context3.next = 3;
            return (0, _nodeFetch.default)("".concat(yahooEndpoint, "?function=").concat(TIME_SERIES_TYPE[type].key, "&symbol=").concat(symbol, "&outputsize=full&apikey=").concat(yahooKey), {
              method: "GET",
              headers: {
                Accept: "application/json"
              }
            });

          case 3:
            dataFetch = _context3.sent;
            _context3.next = 6;
            return dataFetch.json();

          case 6:
            stock = _context3.sent;
            dataSeries = stock[TIME_SERIES_TYPE[type].value];
            histories = Object.keys(dataSeries).map(function (key) {
              var time = key;
              return {
                open: dataSeries[key]["1. open"],
                high: dataSeries[key]["2. high"],
                low: dataSeries[key]["3. low"],
                close: dataSeries[key]["4. close"],
                volume: dataSeries[key]["5. volume"],
                time: time
              };
            });
            return _context3.abrupt("return", {
              symbol: symbol,
              histories: histories
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getStockExchangeExtraday(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getStockExchangeExtraday = getStockExchangeExtraday;