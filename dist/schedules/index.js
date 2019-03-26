"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _sleep = _interopRequireDefault(require("sleep"));

var _moment = _interopRequireDefault(require("moment"));

var _winston = _interopRequireDefault(require("../external-libs/winston"));

var _mongoose = require("../external-libs/mongoose");

var _models = require("../models");

var _utils = require("../utils");

var _constant = require("../utils/constant");

require("dotenv").config();

var _process$env = process.env,
    fromDayOfWeek = _process$env.SCHEDULE_FROM_DAY_OF_WEEK,
    toDayOfWeek = _process$env.SCHEDULE_TO_DAY_OF_WEEK,
    hour = _process$env.SCHEDULE_HOUR,
    minute = _process$env.SCHEDULE_MINUTE;
var rule = new _nodeSchedule.default.RecurrenceRule();
rule.dayOfWeek = [new _nodeSchedule.default.Range(fromDayOfWeek, toDayOfWeek)];
rule.hour = Number(hour);
rule.minute = Number(minute);

var job =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var exchanges, dataExchange, dataDailyUpdate;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _winston.default.info("Begin get data historical");

            _context2.prev = 1;
            _context2.next = 4;
            return (0, _mongoose.connect)();

          case 4:
            exchanges = Object.keys(_constant.YAHOO_LIST_EXCHANGE); // Get data daily of exchange

            _context2.next = 7;
            return (0, _utils.getListExchangeHistorical)({
              symbols: exchanges,
              from: (0, _moment.default)().format("YYYY-MM-DD"),
              to: (0, _moment.default)().add(1, "days").format("YYYY-MM-DD")
            });

          case 7:
            dataExchange = _context2.sent;
            dataDailyUpdate = dataExchange.map(function (item) {
              return _models.Historical.updateMany({
                ticker: item.ticker,
                date: item.date,
                type: "daily",
                exchange: true
              }, (0, _objectSpread2.default)({}, item), {
                upsert: true
              });
            });
            _context2.next = 11;
            return Promise.all(dataDailyUpdate).then(function (res) {
              _winston.default.info("Exchange Daily: ", res.length);

              return true;
            });

          case 11:
            _winston.default.info("Updated Exchange Daily: " + exchanges);

            _context2.next = 14;
            return exchanges.forEach(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(symbol) {
                var dataExchangeIntraday, dataIntradayUpdate;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _utils.getStockExchangeIntraday)({
                          symbol: symbol,
                          interval: "5min"
                        });

                      case 2:
                        dataExchangeIntraday = _context.sent;
                        dataIntradayUpdate = dataExchangeIntraday.map(function (item) {
                          return _models.Historical.updateMany({
                            ticker: item.ticker,
                            date: item.date,
                            type: "intraday",
                            exchange: true
                          }, (0, _objectSpread2.default)({}, item), {
                            upsert: true
                          });
                        });
                        _context.next = 6;
                        return Promise.all(dataIntradayUpdate).then(function (res) {
                          _winston.default.info("Exchange Intraday: ", res.length);

                          return true;
                        });

                      case 6:
                        _winston.default.info("Updated Exchange Intraday : ".concat(symbol, " ").concat(dataIntradayUpdate.length));

                        _context.next = 9;
                        return _sleep.default.sleep(60);

                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 14:
            _winston.default.warn("Fetch all data exchanges");

            return _context2.abrupt("return");

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](1);

            _winston.default.error(_context2.t0);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 18]]);
  }));

  return function job() {
    return _ref.apply(this, arguments);
  };
}();

job();