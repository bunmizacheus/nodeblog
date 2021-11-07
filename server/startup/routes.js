const express = require("express");
const cors = require("cors");

const home = require("../routes/home");
const products = require("../routes/products");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use(express.static("public"));
  app.use("/", home);
  app.use("/api/products", products);

  app.use(error);
};
