const path = require("path");
const express = require("express");

const router = express.Router();
const rootDir = require("../util/path");

router.get("/mobile", (req, res, next) => {
  res.render("uploads", { pageTitle: "choose your upload", mobile: true, version: "mobile" });
});

router.get("/desktop", (req, res, next) => {
  res.render("uploads", { pageTitle: "choose your upload", desktop: true, version: "desktop" });
});

router.get("/mobileAndDesktop", (req, res, next) => {
  res.render("uploads", { pageTitle: "choose your upload", both: true, version: "mobile and desktop" });
});

module.exports = router;
