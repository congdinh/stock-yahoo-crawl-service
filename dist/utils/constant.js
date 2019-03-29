"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YAHOO_GLOBAL_FIELDS = exports.YAHOO_LIST_EXCHANGE = exports.TIME_SERIES_TYPE = void 0;
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
exports.TIME_SERIES_TYPE = TIME_SERIES_TYPE;
var YAHOO_LIST_EXCHANGE = {
  "^HSI": "Hang Seng Index",
  "^GSPC": "S&P 500",
  "^DJI": "Dow Jones Industrial Average",
  "^N225": "Nikkei 225",
  "^IXIC": "Nasdaq Composite",
  "^NDX": "Nasdaq 100"
};
exports.YAHOO_LIST_EXCHANGE = YAHOO_LIST_EXCHANGE;
var YAHOO_GLOBAL_FIELDS = ["symbol", "tradeable", "fullExchangeName", "exchangeTimezoneName", "regularMarketTime", "marketState", "fiftyTwoWeekLow", "fiftyTwoWeekRange", "regularMarketDayRange", "regularMarketPreviousClose", "regularMarketOpen", "regularMarketVolume", "averageDailyVolume3Month", "regularMarketPrice", "regularMarketChange", "regularMarketChangePercent"];
exports.YAHOO_GLOBAL_FIELDS = YAHOO_GLOBAL_FIELDS;