"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStockExchangeExtraday = exports.getStockExchangeIntraday = exports.getListExchangeHistorical = exports.getStockHistorical = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _yahooFinance = _interopRequireDefault(require("yahoo-finance"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _constant = require("./constant");

require("dotenv").config();

var _process$env = process.env,
    yahooEndpoint = _process$env.YAHOO_STOCK_ENDPOINT,
    yahooKey = _process$env.YAHOO_STOCK_KEY;

var getStockHistorical =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref2) {
    var symbol, from, to, _ref2$period, period, _ref2$type, type, _ref2$exchange, exchange, data, histories;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            symbol = _ref2.symbol, from = _ref2.from, to = _ref2.to, _ref2$period = _ref2.period, period = _ref2$period === void 0 ? "d" : _ref2$period, _ref2$type = _ref2.type, type = _ref2$type === void 0 ? "daily" : _ref2$type, _ref2$exchange = _ref2.exchange, exchange = _ref2$exchange === void 0 ? false : _ref2$exchange;
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
              var ticker = item.symbol,
                  newData = (0, _objectWithoutProperties2.default)(item, ["symbol"]);
              return (0, _objectSpread2.default)({}, newData, {
                ticker: ticker,
                name: _constant.YAHOO_LIST_EXCHANGE[symbol],
                type: type,
                exchange: exchange
              });
            });
            return _context.abrupt("return", histories);

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

var getListExchangeHistorical =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_ref4) {
    var symbols, from, to, _ref4$period, period, _ref4$type, type, _ref4$exchange, exchange, dataSeries, dataExchange, histories;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            symbols = _ref4.symbols, from = _ref4.from, to = _ref4.to, _ref4$period = _ref4.period, period = _ref4$period === void 0 ? "d" : _ref4$period, _ref4$type = _ref4.type, type = _ref4$type === void 0 ? "daily" : _ref4$type, _ref4$exchange = _ref4.exchange, exchange = _ref4$exchange === void 0 ? true : _ref4$exchange;
            _context2.next = 3;
            return _yahooFinance.default.historical({
              symbols: symbols,
              from: from,
              to: to,
              period: period
            });

          case 3:
            dataSeries = _context2.sent;
            dataExchange = Object.values(dataSeries);
            histories = [];
            dataExchange.forEach(function (result) {
              result.forEach(function (item) {
                var ticker = item.symbol,
                    newData = (0, _objectWithoutProperties2.default)(item, ["symbol"]);
                histories.push((0, _objectSpread2.default)({}, newData, {
                  ticker: ticker,
                  name: _constant.YAHOO_LIST_EXCHANGE[ticker],
                  type: type,
                  exchange: exchange
                }));
              });
            });
            return _context2.abrupt("return", histories);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getListExchangeHistorical(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getListExchangeHistorical = getListExchangeHistorical;

var getStockExchangeIntraday =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_ref6) {
    var symbol, _ref6$interval, interval, _ref6$size, size, dataFetch, stock, dataZone, dataSeries, histories;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            symbol = _ref6.symbol, _ref6$interval = _ref6.interval, interval = _ref6$interval === void 0 ? "5min" : _ref6$interval, _ref6$size = _ref6.size, size = _ref6$size === void 0 ? "compact" : _ref6$size;
            _context3.next = 3;
            return (0, _nodeFetch.default)("".concat(yahooEndpoint, "?function=TIME_SERIES_INTRADAY&symbol=").concat(symbol, "&interval=").concat(interval, "&outputsize=").concat(size, "&apikey=").concat(yahooKey), {
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
            dataZone = stock["Meta Data"]["6. Time Zone"];
            dataSeries = stock["Time Series (".concat(interval, ")")];
            histories = Object.keys(dataSeries).map(function (key) {
              var date = key;
              return {
                open: dataSeries[key]["1. open"],
                high: dataSeries[key]["2. high"],
                low: dataSeries[key]["3. low"],
                close: dataSeries[key]["4. close"],
                volume: dataSeries[key]["5. volume"],
                exchange: true,
                type: "intraday",
                ticker: symbol,
                name: _constant.YAHOO_LIST_EXCHANGE[symbol],
                date: (0, _momentTimezone.default)(date).tz(dataZone).format("YYYY-MM-DDTHH:mm:ss")
              };
            });
            return _context3.abrupt("return", histories);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getStockExchangeIntraday(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getStockExchangeIntraday = getStockExchangeIntraday;

var getStockExchangeExtraday =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(_ref8) {
    var symbol, _ref8$type, type, _ref8$size, size, dataFetch, stock, dataSeries, histories;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            symbol = _ref8.symbol, _ref8$type = _ref8.type, type = _ref8$type === void 0 ? "daily" : _ref8$type, _ref8$size = _ref8.size, size = _ref8$size === void 0 ? "compact" : _ref8$size;
            _context4.next = 3;
            return (0, _nodeFetch.default)("".concat(yahooEndpoint, "?function=").concat(_constant.TIME_SERIES_TYPE[type].key, "&symbol=").concat(symbol, "&outputsize=").concat(size, "}&apikey=").concat(yahooKey), {
              method: "GET",
              headers: {
                Accept: "application/json"
              }
            });

          case 3:
            dataFetch = _context4.sent;
            _context4.next = 6;
            return dataFetch.json();

          case 6:
            stock = _context4.sent;
            dataSeries = stock[_constant.TIME_SERIES_TYPE[type].value];
            histories = Object.keys(dataSeries).map(function (key) {
              var date = key;
              return {
                open: dataSeries[key]["1. open"],
                high: dataSeries[key]["2. high"],
                low: dataSeries[key]["3. low"],
                close: dataSeries[key]["4. close"],
                volume: dataSeries[key]["5. volume"],
                exchange: true,
                type: "daily",
                ticker: symbol,
                name: _constant.YAHOO_LIST_EXCHANGE[symbol],
                date: (0, _momentTimezone.default)(date).format("YYYY-MM-DDT00:00:00")
              };
            });
            return _context4.abrupt("return", histories);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getStockExchangeExtraday(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getStockExchangeExtraday = getStockExchangeExtraday;