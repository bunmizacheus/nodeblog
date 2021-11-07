const mongoose = require("mongoose");
const config = require("config");

// const logger = require("../middlewares/logger");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.warn(`Connected to ${db}...`));
};
