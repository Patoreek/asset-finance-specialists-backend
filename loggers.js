require("dotenv").config();
const winston = require("winston");
require("winston-mongodb");

const { combine, timestamp, json, prettyPrint, errors } = winston.format;

const mongoDBConnection = process.env.MONGO_URI;

winston.loggers.add("UserLogger", {
  level: "info",
  format: combine(timestamp(), errors({ stack: true }), json(), prettyPrint()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "users.log" }),
    new winston.transports.MongoDB({
      db: mongoDBConnection,
      collection: "user_logs",
      options: { useUnifiedTopology: true },
      level: "info",
    }),
  ],
  defaultMeta: { service: "UserService" },
});

winston.loggers.add("ApplicationLogger", {
  level: "info",
  format: combine(timestamp(), errors({ stack: true }), json(), prettyPrint()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "applications.log" }),
    new winston.transports.MongoDB({
      db: mongoDBConnection,
      collection: "application_logs",
      options: { useUnifiedTopology: true },
      level: "info",
    }),
  ],
  defaultMeta: { service: "ApplicationService" },
});
