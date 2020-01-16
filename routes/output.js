const express = require("express");

const directInputController = require("../controllers/directInputController");
const analyzeController = require("../controllers/analyzeController");
const outputController = require("../controllers/outputController");

const router = express.Router();

router.post("/output", directInputController.saveInputToDB);

router.post("/output", analyzeController.getInput);

router.post("/output", outputController.postOutputPage);

module.exports = router;
