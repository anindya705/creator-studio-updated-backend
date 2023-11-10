const config = require('../config/appconfig');
const mongoose = require("mongoose");
const Logger = require('../utils/logger.js');

const logger = new Logger();

const { env } = config.app
const { url, db, port, mongoUser, mongoPassword } = config.db

const mongoString = process.env.ENV === 'development' ? process.env.DEV_DB : `mongodb://${encodeURIComponent(mongoUser)}:${encodeURIComponent(mongoPassword)}@${url}:${port}/${encodeURIComponent(db)}`;

function connect() {
  logger.log("Connecting database...", "info");
  try {
    mongoose.connect(mongoString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Successfully connected
    mongoose.connection.on("connected", function() {
      logger.log("Databse connected", "info");
    });

    // If the connection throws an error
    mongoose.connection.on("error", function(err) {
      logger.log("Mongoose default connection error: " + err, "error");
    });

    // Connection is disconnected
    mongoose.connection.on("disconnected", function() {
      logger.log("Mongoose default connection disconnected", "info");
    });

    // Mongoose connection gracefully shutdown
    process.on("SIGINT", function() {
      mongoose.connection.close(function() {
        logger.log(
          "Mongoose default connection disconnected through app termination", "info"
        );
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  connect: connect
};