const path = require("path");
const express = require("express");

const router = express.Router();
const rootDir = require("../util/path");

router.get("/formats", (req, res, next) => {
  res.render("presets", { pageTitle: "Choose your format" });
});

module.exports = router;
