"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var HistoricalSchema = new _mongoose.default.Schema({
  ticker: String,
  name: String,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
  adjClose: Number,
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    default: "daily"
  },
  exchange: {
    type: Boolean,
    default: false
  }
}, {
  collection: "Historical",
  versionKey: false,
  strict: false
});

var _default = _mongoose.default.model("Historical", HistoricalSchema);

exports.default = _default;