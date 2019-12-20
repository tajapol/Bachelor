const path = require("path");
const express = require("express");

const router = express.Router();
const rootDir = require("../util/path");

router.get("/mobile", (req, res, next) => {
  res.render("presets", { pageTitle: "choose your upload", mobile: true, version: "mobile", hasChoosen: true });
});

router.get("/desktop", (req, res, next) => {
  res.render("presets", { pageTitle: "choose your upload", desktop: true, version: "desktop", hasChoosen: true });
});

router.get("/mobileAndDesktop", (req, res, next) => {
  res.render("presets", { pageTitle: "choose your upload", both: true, version: "mobile and desktop", hasChoosen: true });
});

module.exports = router;
