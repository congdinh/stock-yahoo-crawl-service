import schedule from "node-schedule";
import sleep from "sleep";
import moment from "moment";
import logger from "../external-libs/winston";
import { connect as connectMongoDB } from "../external-libs/mongoose";
import { Historical } from "../models";

import { getStockExchangeIntraday, getListExchangeHistorical } from "../utils";
import { YAHOO_LIST_EXCHANGE } from "../utils/constant";
require("dotenv").config();

const {
  SCHEDULE_FROM_DAY_OF_WEEK: fromDayOfWeek,
  SCHEDULE_TO_DAY_OF_WEEK: toDayOfWeek,
  SCHEDULE_HOUR: hour,
  SCHEDULE_MINUTE: minute
} = process.env;

let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(fromDayOfWeek, toDayOfWeek)];
rule.hour = Number(hour);
rule.minute = Number(minute);

const job = async () => {
  logger.info("Begin get data historical");

  try {
    //todo
    await connectMongoDB();
    const exchanges = Object.keys(YAHOO_LIST_EXCHANGE);

    // Get data daily of exchange
    const dataExchange = await getListExchangeHistorical({
      symbols: exchanges,
      from: moment().format("YYYY-MM-DD"),
      to: moment()
        .add(1, "days")
        .format("YYYY-MM-DD")
    });

    const dataDailyUpdate = dataExchange.map(item => {
      return Historical.updateMany(
        { ticker: item.ticker, date: item.date, type: "daily", exchange: true },
        { ...item },
        { upsert: true }
      );
    });

    await Promise.all(dataDailyUpdate).then(res => {
      console.log("Exchange Daily: ", res.length);
      return true;
    });

    logger.info("Updated Exchange Daily: " + exchanges);

    await exchanges.forEach(async symbol => {
      //     // Get data daily of exchange
      //     const dataExchangeExtraday = await getStockExchangeExtraday({
      //       symbol
      //     });
      //     await Historical.insertMany(dataExchangeExtraday, {
      //       ordered: false
      //     });
      //     logger.info("inserted Exchange Extraday: " + symbol);

      // Get data intraday of exchange
      const dataExchangeIntraday = await getStockExchangeIntraday({
        symbol,
        interval: "5min"
      });

      const dataIntradayUpdate = dataExchangeIntraday.map(item => {
        return Historical.updateMany(
          {
            ticker: item.ticker,
            date: item.date,
            type: "intraday",
            exchange: true
          },
          { ...item },
          { upsert: true }
        );
      });

      await Promise.all(dataIntradayUpdate).then(res => {
        console.log("Exchange Intraday: ", res.length);
        return true;
      });
      logger.info(
        `Updated Exchange Intraday : ${symbol} ${dataIntradayUpdate.length}`
      );
      await sleep.sleep(60);
    });

    logger.warn("Fetch all data exchanges");
    return;
  } catch (err) {
    logger.error(err);
  }
};

job();
