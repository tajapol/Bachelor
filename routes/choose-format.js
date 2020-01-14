const express = require("express");

const chooseFormatController = require("../controllers/chooseFormatController");

const router = express.Router();

router.get("/choose-format", chooseFormatController.getFormatsPage);

module.exports = router;
