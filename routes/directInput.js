const express = require("express");

const inputController = require("../controllers/inputController");

const router = express.Router();

router.get("/directInput", inputController.getFormatsPage);

module.exports = router;
