const path = require("path");
const express = require("express");

const router = express.Router();
const rootDir = require("../util/path");

router.get("/formats", (req, res, next) => {
  res.render("formats", { pageTitle: "Choose your format" });
});

router.post("/formats", (req, res, next) => {
  res.send("<h1>Hello</h1>");
});

module.exports = router;
