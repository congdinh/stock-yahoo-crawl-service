import {
  getStockHistorical,
  getHistoryLatest,
  getGlobalRealtime
} from "./service";
// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
export default {
  Query: {
    stockHistorical: (_, args) => getStockHistorical({ ...args }),
    stockHistoryLatest: (_, args) => getHistoryLatest({ ...args }),
    stockGlobalRealtime: (_, args) => getGlobalRealtime({ ...args })
  }
};
