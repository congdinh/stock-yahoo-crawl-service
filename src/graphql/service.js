import moment from "moment";
import { Historical, Global } from "../models";

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
    date: {
      $gte: from ? moment(from) : moment().startOf("day"),
      $lte: to ? moment(to) : moment().endOf("day")
    }
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

export const getGlobalRealtime = async ({ symbols }) => {
  const listQuery = symbols.map(item => {
    return Global.findOne({ symbol: item }).sort({ updateAt: -1 });
  });

  const data = await Promise.all(listQuery);
  return { data };
};
