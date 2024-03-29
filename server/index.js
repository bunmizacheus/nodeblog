// const logger = require("./middlewares/logger");

const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3900;
const server = app.listen(port, () =>
  console.info(`Listening on port ${port}...`)
);

module.exports = server;
