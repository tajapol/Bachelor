const express = require("express");

const formattingController = require("../controllers/directFormattingController");
const outputController = require("../controllers/outputController");
const analyzeController = require("../controllers/analyzeController");

const router = express.Router();

router.post("/direct-output", formattingController.doFormatting, formattingController.getValidation);
router.post(
  "/direct-output",
  analyzeController.getColorsDB,
  analyzeController.getYellowDB,
  analyzeController.getBlueDB,
  analyzeController.getBrownDB,
  analyzeController.getGrayDB,
  analyzeController.getGreenDB,
  analyzeController.getOrangeDB,
  analyzeController.getRedDB,
  analyzeController.getViolettDB,
  analyzeController.getWhiteDB,
  analyzeController.getFontsDB,
  analyzeController.getSerifDB,
  analyzeController.getSansSerifDB,
  analyzeController.getMonospaceDB,
  analyzeController.getFantasyDB
);
router.post("/direct-output", outputController.postOutputPage);

module.exports = router;
