import yahooFinance from "yahoo-finance";
import fetch from "node-fetch";
import moment from "moment";
require("dotenv").config();

const TIME_SERIES_TYPE = {
  intraday: { key: "TIME_SERIES_INTRADAY", value: "" },
  daily: { key: "TIME_SERIES_DAILY", value: "Time Series (Daily)" },
  weekly: { key: "TIME_SERIES_WEEKLY", value: "Weekly Time Series" },
  monthly: { key: "TIME_SERIES_MONTHLY", value: "Monthly Time Series" }
};

const {
  YAHOO_STOCK_ENDPOINT: yahooEndpoint,
  YAHOO_STOCK_KEY: yahooKey
} = process.env;

export const getStockHistorical = async ({
  symbol,
  from,
  to,
  period = "d"
}) => {
  // symbol: 'GOOGL'
  // from: '2019-03-01'
  // to: '2019-03-10'
  // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  const data = await yahooFinance.historical({ symbol, from, to, period });
  const histories = data.map(item => {
    const { date, symbol, ...newData } = item;
    return {
      ...newData,
      time: moment(date).format("YYYY-MM-DD HH:mm:ss")
    };
  });
  return {
    symbol,
    histories
  };
};

export const getStockExchangeIntraday = async ({
  symbol,
  interval = "60min"
}) => {
  //1min, 5min, 15min, 30min, 60min
  const dataFetch = await fetch(
    `${yahooEndpoint}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=full&apikey=${yahooKey}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }
  );
  const stock = await dataFetch.json();
  const dataSeries = stock[`Time Series (${interval})`];
  const histories = Object.keys(dataSeries).map(key => {
    const time = key;
    return {
      open: dataSeries[key]["1. open"],
      high: dataSeries[key]["2. high"],
      low: dataSeries[key]["3. low"],
      close: dataSeries[key]["4. close"],
      volume: dataSeries[key]["5. volume"],
      time
    };
  });
  return {
    symbol,
    histories
  };
};

export const getStockExchangeExtraday = async ({ symbol, type = "daily" }) => {
  const dataFetch = await fetch(
    `${yahooEndpoint}?function=${
      TIME_SERIES_TYPE[type].key
    }&symbol=${symbol}&outputsize=full&apikey=${yahooKey}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }
  );
  const stock = await dataFetch.json();
  const dataSeries = stock[TIME_SERIES_TYPE[type].value];
  const histories = Object.keys(dataSeries).map(key => {
    const time = key;
    return {
      open: dataSeries[key]["1. open"],
      high: dataSeries[key]["2. high"],
      low: dataSeries[key]["3. low"],
      close: dataSeries[key]["4. close"],
      volume: dataSeries[key]["5. volume"],
      time
    };
  });
  return {
    symbol,
    histories
  };
};
