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
    const filterData = dataExchange.filter(
      item =>
        moment(item.date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
    );
    await Historical.insertMany(filterData, {
      ordered: false
    });
    logger.info("inserted Exchange Extraday: " + exchanges);

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

      const filterDataIntraday = dataExchangeIntraday.filter(
        item =>
          moment(item.date).format("YYYY-MM-DD") ===
          moment().format("YYYY-MM-DD")
      );
      await Historical.insertMany(filterDataIntraday, {
        ordered: false
      });
      logger.info(
        `inserted Exchange Intraday : ${symbol} ${filterDataIntraday.length}`
      );
      await sleep.sleep(60);
    });

    logger.warn("Fetch all data stock");
    return;
  } catch (err) {
    logger.error(err);
  }
};

job();
