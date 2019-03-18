"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.connect = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

_mongoose.default.Promise = global.Promise;

var connect =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var _ref2,
        _ref2$host,
        host,
        _ref2$port,
        port,
        _ref2$dbName,
        dbName,
        mongoURL,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref2$host = _ref2.host, host = _ref2$host === void 0 ? process.env.MONGO_DEFAULT_HOST : _ref2$host, _ref2$port = _ref2.port, port = _ref2$port === void 0 ? process.env.MONGO_DEFAULT_PORT : _ref2$port, _ref2$dbName = _ref2.dbName, dbName = _ref2$dbName === void 0 ? process.env.MONGO_DEFAULT_DB_NAME : _ref2$dbName;
            mongoURL = "mongodb://".concat(host, ":").concat(port, "/").concat(dbName);

            _mongoose.default.connect(mongoURL, {
              useNewUrlParser: true,
              useCreateIndex: true,
              autoReconnect: true,
              keepAlive: 30000,
              reconnectInterval: 3000,
              reconnectTries: 10000
            });

            return _context.abrupt("return", _mongoose.default);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function connect() {
    return _ref.apply(this, arguments);
  };
}();

exports.connect = connect;
var _default = _mongoose.default;
exports.default = _default;