const express = require("express");

const formattingController = require("../controllers/fileFormattingController");
const outputController = require("../controllers/outputController");
const analyzeController = require("../controllers/analyzeController");

const router = express.Router();

router.post("/file-output", formattingController.doFormatting, formattingController.getValidation);

router.post(
  "/file-output",
  analyzeController.getColorsDB,
  analyzeController.getYellowDB,
  analyzeController.getBlueDB,
  analyzeController.getBrownDB,
  analyzeController.getGrayDB,
  analyzeController.getGreenDB,
  analyzeController.getOrangeDB,
  analyzeController.getRedDB,
  analyzeController.getViolettDB,
  analyzeController.getWhiteDB
);

router.post("/file-output", outputController.postOutputPage);

module.exports = router;
