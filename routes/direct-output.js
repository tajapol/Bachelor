const express = require("express");

const formattingController = require("../controllers/directFormattingController");
const outputController = require("../controllers/outputController");

const router = express.Router();

router.post("/direct-output", formattingController.postDirectInput);
router.post("/direct-output", formattingController.doFormatting);
router.post("/direct-output", formattingController.getValidation);
router.post("/direct-output", outputController.postOutputPage);

module.exports = router;
