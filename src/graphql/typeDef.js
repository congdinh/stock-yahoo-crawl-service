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

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    stockHistorical(
      ticker: String
      from: String
      to: String
      type: String
      exchange: Boolean
    ): StockExchange
    stockHistoryLatest(
      ticker: String
      type: String
      exchange: Boolean
    ): StockExchangeHistory
  }
`;
