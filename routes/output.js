const express = require("express");

// const directInputController = require("../controllers/directInputController");
const formattingController = require("../controllers/formattingController");
const outputController = require("../controllers/outputController");

const router = express.Router();

router.post("/output", formattingController.getDirecInput);
router.post("/output", formattingController.getValidation);
// router.post("/direct-input", directInputController.getDirectInputPage);

router.post("/output", outputController.postOutputPage);

module.exports = router;
