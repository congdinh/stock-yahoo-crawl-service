import moment from "moment";
import { Historical } from "../models";

export const getStockHistorical = async ({
  ticker,
  from,
  to,
  type = "daily",
  exchange = true
}) => {
  const query = {
    ticker,
    type,
    exchange,
    date: { $gte: moment(from), $lte: moment(to) }
  };
  const histories = await Historical.find(query)
    .sort({ date: -1 })
    .lean()
    .exec();

  return {
    ticker,
    histories
  };
};

export const getHistoryLatest = async ({
  ticker,
  type = "daily",
  exchange = true
}) => {
  const query = {
    ticker,
    type,
    exchange
  };
  const histories = await Historical.findOne(query)
    .sort({ date: -1 })
    .lean()
    .exec();
  return histories;
};
