export const TIME_SERIES_TYPE = {
  intraday: { key: "TIME_SERIES_INTRADAY", value: "" },
  daily: { key: "TIME_SERIES_DAILY", value: "Time Series (Daily)" },
  weekly: { key: "TIME_SERIES_WEEKLY", value: "Weekly Time Series" },
  monthly: { key: "TIME_SERIES_MONTHLY", value: "Monthly Time Series" }
};

export const YAHOO_LIST_EXCHANGE = {
  "^HSI": "Hang Seng Index",
  "^GSPC": "S&P 500",
  "^DJI": "Dow Jones Industrial Average",
  "^N225": "Nikkei 225",
  "^IXIC": "Nasdaq Composite",
  "^NDX": "Nasdaq 100"
};

export const YAHOO_GLOBAL_FIELDS = [
  "symbol",
  "tradeable",
  "fullExchangeName",
  "exchangeTimezoneName",
  "regularMarketTime",
  "fiftyTwoWeekLow",
  "fiftyTwoWeekRange",
  "regularMarketDayRange",
  "regularMarketPreviousClose",
  "regularMarketOpen",
  "regularMarketVolume",
  "averageDailyVolume3Month",
  "regularMarketPrice",
  "regularMarketChange",
  "regularMarketChangePercent"
];
