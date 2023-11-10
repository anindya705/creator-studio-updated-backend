const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const config = require("../config/appconfig");
const Logger = require("../utils/logger.js");

const logger = new Logger();
const app = express();
app.set("config", config); // the system configrationsx
// app.use(bodyParser.json());
app.use(require("method-override")());

app.use(compression());
app.use(cors());
// const swagger = require('../utils/swagger');

process.on("SIGINT", () => {
  logger.log("stopping the server", "info");
  process.exit();
});

db.connect();

app.set("port", process.env.DEV_APP_PORT);
// app.use('/api/docs', swagger.router);

app.use((req, res, next) => {
  if (req.url === "/api/v1/stripe/webhook") {
    return next();
  }
  req.identifier = uuidv4();
  const logString = `a request has been made with the following uuid [${
    req.identifier
  }] ${req.url} ${req.headers["user-agent"]} ${JSON.stringify(req.body)}`;
  logger.log(logString, "info");
  next();
});

/* Stripe webhook body convert into json */
app.use((req, res, next) => {
  if (req.url === "/api/v1/stripe/webhook") {
    return next();
  }
  return express.json({ limit: "50mb" })(req, res, next);
});

app.use((req, res, next) => {
  if (req.url === "/api/v1/stripe/webhook") {
    return express.raw({ type: "application/json" })(req, res, next);
  }
  return next();
});

app.use(require("../router"));

app.use((req, res, next) => {
  logger.log(
    "the url you are trying to reach is not hosted on our server",
    "error"
  );
  res.statusCode = 500;
  next(err);
});

module.exports = app;
