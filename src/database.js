const mongoose = require("mongoose");
const logger = require("./logger");
require("dotenv").config();

const connected = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info("Database connected");
    })
    .catch((error) => {
      logger.error(error);
    });
};

module.exports = connected;
