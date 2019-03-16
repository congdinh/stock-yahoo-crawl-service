import {
  getStockHistorical,
  getStockExchangeIntraday,
  getStockExchangeExtraday
} from "./service";
// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
export default {
  Query: {
    stockHistorical: (_, args) => getStockHistorical({ ...args }),
    stockExchangeIntraday: (_, args) => getStockExchangeIntraday({ ...args }),
    stockExchangeExtraday: (_, args) => getStockExchangeExtraday({ ...args })
  }
};
