import mongoose from "mongoose";

const HistoricalSchema = new mongoose.Schema(
  {
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
    type: { type: String, default: "daily" },
    exchange: { type: Boolean, default: false }
  },
  { collection: "Historical", versionKey: false, strict: false }
);

export default mongoose.model("Historical", HistoricalSchema);
