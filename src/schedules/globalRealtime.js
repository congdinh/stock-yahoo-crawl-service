import logger from "../external-libs/winston";
import { connect as connectMongoDB } from "../external-libs/mongoose";
import { Global } from "../models";

import { getStockGlobalRealtime } from "../utils";
import { YAHOO_LIST_EXCHANGE } from "../utils/constant";

require("dotenv").config();

const job = async () => {
  logger.info("Begin get data global");

  try {
    //todo
    await connectMongoDB();
    const exchanges = Object.keys(YAHOO_LIST_EXCHANGE);
    const data = await getStockGlobalRealtime({ symbols: exchanges });
    const dataUpdate = data.map(item => {
      return Global.updateMany(
        { symbol: item.symbol, marketTime: item.marketTime },
        { ...item },
        { upsert: true }
      );
    });

    await Promise.all(dataUpdate).then(res => {
      logger.info("Global Realtime: " + res.length);
      return true;
    });

    logger.info("Updated global realtime: " + exchanges);
  } catch (err) {
    logger.error(err);
  }
};

job();
