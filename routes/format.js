const express = require("express");

const formatsController = require("../controllers/formatController");

const router = express.Router();

router.get("/formats", formatsController.getFormatsPage);

module.exports = router;
