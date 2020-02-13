const express = require("express");

const formattingController = require("../controllers/fileFormattingController");
const outputController = require("../controllers/outputController");
const anaColorController = require("../controllers/anaColorController");
const anaFontsController = require("../controllers/anaFontsController");
const router = express.Router();

router.post("/file-output", formattingController.doFormatting, formattingController.getValidation);

router.post(
  "/file-output",
  anaColorController.getColorsDB,
  anaColorController.getYellowDB,
  anaColorController.getBlueDB,
  anaColorController.getBrownDB,
  anaColorController.getGrayDB,
  anaColorController.getGreenDB,
  anaColorController.getOrangeDB,
  anaColorController.getRedDB,
  anaColorController.getViolettDB,
  anaColorController.getWhiteDB
);

router.post(
  "/file-output",
  anaFontsController.getFontsDB,
  anaFontsController.getSerifDB,
  anaFontsController.getSansSerifDB,
  anaFontsController.getMonospaceDB,
  anaFontsController.getFantasyDB
);

router.post("/file-output", outputController.postOutputPage);

module.exports = router;
