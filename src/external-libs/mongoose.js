import mongoose from "mongoose";

mongoose.Promise = global.Promise;

export const connect = async ({
  host = process.env.MONGO_DEFAULT_HOST,
  port = process.env.MONGO_DEFAULT_PORT,
  dbName = process.env.MONGO_DEFAULT_DB_NAME
} = {}) => {
  const mongoURL = `mongodb://${host}:${port}/${dbName}`;

  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoReconnect: true,
    keepAlive: 30000,
    reconnectInterval: 3000,
    reconnectTries: 10000
  });

  return mongoose;
};

export default mongoose;
