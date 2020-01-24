const express = require("express");

// const directInputController = require("../controllers/directInputController");
const formattingController = require("../controllers/formattingController");
const outputController = require("../controllers/outputController");

const router = express.Router();

router.post("/output", formattingController.getInput);
router.post("/output", formattingController.getValidation);
// router.post("/direct-input", directInputController.getDirectInputPage);

router.post("/output", outputController.postOutputPage);

module.exports = router;
