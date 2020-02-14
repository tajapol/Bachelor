const express = require("express");

const formattingController = require("../controllers/directFormattingController");
const outputController = require("../controllers/outputController");
const anaColorController = require("../controllers/anaColorController");
const anaFontsController = require("../controllers/anaFontsController");

const router = express.Router();

router.post("/direct-output", formattingController.doFormatting, formattingController.getValidation);
router.post(
  "/direct-output",
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

router.post("/direct-output", anaFontsController.getFontsDB);
router.post("/direct-output", outputController.postOutputPage);

module.exports = router;
