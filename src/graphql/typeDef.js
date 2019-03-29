import { gql } from "apollo-server";

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
export default gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Historical" type can be used in other type declarations.
  type StockExchangeHistory {
    open: Float
    high: Float
    low: Float
    close: Float
    volume: Float
    adjClose: Float
    date: String
    ticker: String
    name: String
  }

  type StockExchange {
    ticker: String
    histories: [StockExchangeHistory]
  }

  type GlobalRealtime {
    symbol: String
    marketTime: Int
    updateAt: String
    marketState: String
    exchangeTimezoneName: String
    tradeable: Boolean
    regularMarketTime: GlobalRaw
    fiftyTwoWeekLow: GlobalRaw
    fiftyTwoWeekRange: GlobalRaw
    regularMarketDayRange: GlobalRaw
    regularMarketPreviousClose: GlobalRaw
    regularMarketOpen: GlobalRaw
    regularMarketVolume: GlobalRaw
    averageDailyVolume3Month: GlobalRaw
    regularMarketPrice: GlobalRaw
    regularMarketChange: GlobalRaw
    regularMarketChangePercent: GlobalRaw
  }

  type GlobalRaw {
    raw: String
    fmt: String
    longFmt: String
  }

  type StockGlobalRealtime {
    data: [GlobalRealtime]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    stockHistorical(
      """
      Symbol of stock/exchange
      """
      ticker: String!
      """
      From date default today

      daily: YYYY-MM-DD

      intraday: YYYY-MM-DD HH:mm:ss
      """
      from: String
      """
      To date default today

      daily: YYYY-MM-DD

      intraday: YYYY-MM-DD HH:mm:ss
      """
      to: String
      """
      Intraday or daily(default)
      """
      type: String
      """
      Boolean: true(default)
      """
      exchange: Boolean
    ): StockExchange
    stockHistoryLatest(
      """
      Symbol of stock/exchange
      """
      ticker: String!
      """
      Intraday or daily(default)
      """
      type: String
      """
      Boolean: true(default)
      """
      exchange: Boolean
    ): StockExchangeHistory
    stockGlobalRealtime(symbols: [String!]): StockGlobalRealtime
  }
`;
