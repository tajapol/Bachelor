const express = require("express");

const directInputController = require("../controllers/directInputController");

const router = express.Router();

router.get("/directInput", directInputController.getFormatsPage);

module.exports = router;
