const express = require("express");

const formatController = require("../controllers/formatController");

const router = express.Router();

router.get("/choose-format", formatController.getFormatsPage);

module.exports = router;
