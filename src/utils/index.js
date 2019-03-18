import yahooFinance from "yahoo-finance";
import fetch from "node-fetch";
import moment from "moment-timezone";
import { TIME_SERIES_TYPE, YAHOO_LIST_EXCHANGE } from "./constant";
require("dotenv").config();

const {
  YAHOO_STOCK_ENDPOINT: yahooEndpoint,
  YAHOO_STOCK_KEY: yahooKey
} = process.env;

export const getStockHistorical = async ({
  symbol,
  from,
  to,
  period = "d",
  type = "daily",
  exchange = false
}) => {
  // symbol: 'GOOGL'
  // from: '2019-03-01'
  // to: '2019-03-10'
  // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  const data = await yahooFinance.historical({ symbol, from, to, period });
  const histories = data.map(item => {
    const { symbol: ticker, ...newData } = item;
    return {
      ...newData,
      ticker,
      name: YAHOO_LIST_EXCHANGE[symbol],
      type,
      exchange
    };
  });
  return histories;
};

export const getListExchangeHistorical = async ({
  symbols,
  from,
  to,
  period = "d",
  type = "daily",
  exchange = true
}) => {
  const dataSeries = await yahooFinance.historical({
    symbols,
    from,
    to,
    period
  });
  const dataExchange = Object.values(dataSeries);
  let histories = [];

  dataExchange.forEach(result => {
    result.forEach(item => {
      const { symbol: ticker, ...newData } = item;
      histories.push({
        ...newData,
        ticker,
        name: YAHOO_LIST_EXCHANGE[ticker],
        type,
        exchange
      });
    });
  });
  return histories;
};

export const getStockExchangeIntraday = async ({
  symbol,
  interval = "5min",
  size = "compact"
}) => {
  //1min, 5min, 15min, 30min, 60min
  const dataFetch = await fetch(
    `${yahooEndpoint}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=${size}&apikey=${yahooKey}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }
  );
  const stock = await dataFetch.json();
  const dataZone = stock["Meta Data"]["6. Time Zone"];
  const dataSeries = stock[`Time Series (${interval})`];
  const histories = Object.keys(dataSeries).map(key => {
    const date = key;
    return {
      open: dataSeries[key]["1. open"],
      high: dataSeries[key]["2. high"],
      low: dataSeries[key]["3. low"],
      close: dataSeries[key]["4. close"],
      volume: dataSeries[key]["5. volume"],
      exchange: true,
      type: "intraday",
      ticker: symbol,
      name: YAHOO_LIST_EXCHANGE[symbol],
      date: moment(date)
        .tz(dataZone)
        .format("YYYY-MM-DDTHH:mm:ss")
    };
  });
  return histories;
};

export const getStockExchangeExtraday = async ({
  symbol,
  type = "daily",
  size = "compact"
}) => {
  const dataFetch = await fetch(
    `${yahooEndpoint}?function=${
      TIME_SERIES_TYPE[type].key
    }&symbol=${symbol}&outputsize=${size}}&apikey=${yahooKey}`,
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
    const date = key;
    return {
      open: dataSeries[key]["1. open"],
      high: dataSeries[key]["2. high"],
      low: dataSeries[key]["3. low"],
      close: dataSeries[key]["4. close"],
      volume: dataSeries[key]["5. volume"],
      exchange: true,
      type: "daily",
      ticker: symbol,
      name: YAHOO_LIST_EXCHANGE[symbol],
      date: moment(date).format("YYYY-MM-DDT00:00:00")
    };
  });
  return histories;
};
