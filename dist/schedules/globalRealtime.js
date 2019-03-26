"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _winston = _interopRequireDefault(require("../external-libs/winston"));

var _mongoose = require("../external-libs/mongoose");

var _models = require("../models");

var _utils = require("../utils");

var _constant = require("../utils/constant");

require("dotenv").config();

var job =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var exchanges, data, dataUpdate;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _winston.default.info("Begin get data global");

            _context.prev = 1;
            _context.next = 4;
            return (0, _mongoose.connect)();

          case 4:
            exchanges = Object.keys(_constant.YAHOO_LIST_EXCHANGE);
            _context.next = 7;
            return (0, _utils.getStockGlobalRealtime)({
              symbols: exchanges
            });

          case 7:
            data = _context.sent;
            dataUpdate = data.map(function (item) {
              return _models.Global.updateMany({
                symbol: item.symbol,
                marketTime: item.marketTime
              }, (0, _objectSpread2.default)({}, item), {
                upsert: true
              });
            });
            _context.next = 11;
            return Promise.all(dataUpdate).then(function (res) {
              _winston.default.info("Global Realtime: " + res.length);

              return true;
            });

          case 11:
            _winston.default.info("Updated global realtime: " + exchanges);

            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);

            _winston.default.error(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 14]]);
  }));

  return function job() {
    return _ref.apply(this, arguments);
  };
}();

job();