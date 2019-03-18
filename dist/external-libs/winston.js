"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _winston = require("winston");

var customFormat = _winston.format.printf(function (_ref) {
  var timestamp = _ref.timestamp,
      level = _ref.level,
      message = _ref.message;
  return "[".concat(timestamp, "] ").concat(level, ": ").concat(message);
});

var timestampWithTimezone = (0, _winston.format)(function (info) {
  info.timestamp = (0, _moment.default)().format();
  return info;
});
var logger = (0, _winston.createLogger)({
  level: "info",
  format: _winston.format.combine(timestampWithTimezone(), _winston.format.json(), customFormat),
  transports: [new _winston.transports.File({
    filename: "".concat(process.cwd(), "/logs/error.log"),
    level: "error"
  })],
  exceptionHandlers: [new _winston.transports.File({
    filename: "".concat(process.cwd(), "/logs/exceptions.log")
  })]
});

if (process.env.NODE_ENV !== "test") {
  logger.add(new _winston.transports.Console({
    format: _winston.format.combine(_winston.format.colorize(), timestampWithTimezone(), _winston.format.simple(), customFormat)
  }));
}

var _default = {
  info: logger.info,
  warn: logger.warn,
  error: function error(_error, additionalData) {
    var message = _error; // Error-like

    if (_error && _error.message && _error.stack) {
      message = [_error.message, "---", JSON.stringify(_error.stack)].join("\n");
    }

    if (typeof message !== "string") {
      message = JSON.stringify(_error);
    }

    if (additionalData) {
      message = [message, "---", JSON.stringify(additionalData)].join("\n");
    }

    return logger.error(["###", message, "###"].join("\n"));
  }
};
exports.default = _default;