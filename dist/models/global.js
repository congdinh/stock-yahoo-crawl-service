"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var GlobalSchema = new _mongoose.default.Schema({
  symbol: String,
  marketTime: Number,
  exchangeTimezoneName: String,
  tradeable: Boolean,
  marketState: String,
  updateAt: {
    type: Date,
    default: Date.now
  },
  regularMarketTime: {
    raw: Number,
    fmt: String,
    longFmt: String
  },
  fiftyTwoWeekLow: {
    raw: Number,
    fmt: String,
    longFmt: String
  },
  fiftyTwoWeekRange: {
    raw: String,
    fmt: String,
    longFmt: String
  },
  regularMarketDayRange: {
    raw: String,
    fmt: String,
    longFmt: String
  },
  regularMarketPreviousClose: {
    raw: Number,
    fmt: String,
    longFmt: String
  },
  regularMarketOpen: {
    raw: Number,
    fmt: String,
    longFmt: String
  },
  regularMarketVolume: {
    raw: Number,
    fmt: String,
    longFmt: String
  },
  averageDailyVolume3Month: {
    raw: Number,
    fmt: String,
    longFmt: String
  },
  regularMarketPrice: {
    raw: Number,
    fmt: String,
    longFmt: String
  },
  regularMarketChange: {
    raw: Number,
    fmt: String,
    longFmt: String
  },
  regularMarketChangePercent: {
    raw: Number,
    fmt: String,
    longFmt: String
  }
}, {
  collection: "Global",
  versionKey: false,
  strict: false
});

var _default = _mongoose.default.model("Global", GlobalSchema);

exports.default = _default;