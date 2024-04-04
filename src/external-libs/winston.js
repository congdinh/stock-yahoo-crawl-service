import moment from "moment";
import { createLogger, transports, format } from "winston";

const customFormat = format.printf(
  ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
);
const timestampWithTimezone = format(info => {
  info.timestamp = moment().format();
  return info;
});

const logger = createLogger({
  level: "info",
  format: format.combine(timestampWithTimezone(), format.json(), customFormat),
  transports: [
    new transports.File({
      filename: `${process.cwd()}/logs/error.log`,
      level: "error"
    })
  ],
  exceptionHandlers: [
    new transports.File({ filename: `${process.cwd()}/logs/exceptions.log` })
  ]
});

if (process.env.NODE_ENV !== "test") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        timestampWithTimezone(),
        format.simple(),
        customFormat
      )
    })
  );
}

export default {
  info: logger.info,
  warn: logger.warn,
  error: (error, additionalData) => {
    let message = error;
    // Error-like
    if (error && error.message && error.stack) {
      message = [error.message, "---", JSON.stringify(error.stack)].join("\n");
    }

    if (typeof message !== "string") {
      message = JSON.stringify(error);
    }

    if (additionalData) {
      message = [message, "---", JSON.stringify(additionalData)].join("\n");
    }
    return logger.error(["###", message, "###"].join("\n"));
  }
};
