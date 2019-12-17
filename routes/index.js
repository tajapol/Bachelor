const path = require("path");

const express = require("express");

const router = express.Router();
const rootDir = require("../util/path");

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "index.html"));
  //   res.send('<form action="/chooseFormat" method="POST"><input type="text" name="title"><button type="submit"> Add Product </button></form>');
});

module.exports = router;
