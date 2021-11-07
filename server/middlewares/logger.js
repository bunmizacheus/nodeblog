const winston = require("winston");
//require("winston-mongodb");

const { format } = winston;

const logger = winston.createLogger({
  level: "error",
  handleExceptions: true,
  handleRejections: true,
  defaultMeta: { service: "user-service" },
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.json(),
    format.metadata()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "logfile.log" }),
    //new winston.transports.MongoDB({ db: "mongodb://localhost/db" }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtRejections.log" }),
  ],
});

module.exports = logger;
