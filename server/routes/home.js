const express = require("express");
const app = express();
const router = express.Router();

app.set("view engine", "pug");
app.set("views", "../views/index"); // default

router.get("/", (req, res) => {
  res.render("index", { title: "Node JS Blog", message: "Hello" });
});

module.exports = router;
