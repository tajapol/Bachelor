const path = require("path");
const express = require("express");

const router = express.Router();
const rootDir = require("../util/path");

router.get("/mobile", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "uploads.html"));
});

// router.get("mobileAndDesktop", (req, res, next) => {
//     res.sendFile(path.join(__dirname, "../", "views", "upload.html"));
//   });

//   router.get("desktop", (req, res, next) => {
//     res.sendFile(path.join(__dirname, "../", "views", "upload.html"));
//   });

module.exports = router;
