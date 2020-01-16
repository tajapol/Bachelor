const express = require("express");

const directInputController = require("../controllers/directInputController");
const formattingController = require("../controllers/formattingController");
const outputController = require("../controllers/outputController");

const router = express.Router();

router.post("/output", directInputController.saveInputToDB);
router.post("/output", formattingController.getInput);

router.post("/output", outputController.postOutputPage);

module.exports = router;
