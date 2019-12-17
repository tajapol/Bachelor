const path = require("path");
const express = require("express");

const router = express.Router();
const rootDir = require("../util/path");

router.get("/chooseFormat", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "chooseFormat.html"));
  //   res.send('<form action="/chooseFormat" method="POST"><input type="text" name="title"><button type="submit"> Add Product </button></form>');
});

router.post("/chooseFormat", (req, res, next) => {
  res.send("<h1>Hello</h1>");
});

module.exports = router;
