const path = require("path");

const express = require("express");

const router = express.Router();
const rootDir = require("../util/path");

router.get("/", (req, res, next) => {
  res.render("index", { pageTitle: "landingPage" });
});

module.exports = router;
