const express = require("express");

const outputController = require("../controllers/outputController");
const directInputController = require("../controllers/directInputController");

const router = express.Router();

router.post("/output", directInputController.saveInputToDB);

router.post("/output", outputController.getInput);
router.post("/output", outputController.saveFormIn);
router.post("/output", outputController.postOutputPage);

module.exports = router;
