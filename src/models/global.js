import mongoose from "mongoose";

const GlobalSchema = new mongoose.Schema(
  {
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
  },
  { collection: "Global", versionKey: false, strict: false }
);

export default mongoose.model("Global", GlobalSchema);
