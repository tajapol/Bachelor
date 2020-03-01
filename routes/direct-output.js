const express = require("express");

const formatingController = require("../controllers/directFormatingController");
const outputController = require("../controllers/outputController");
const anaColorController = require("../controllers/anaColorController");
const anaFontsController = require("../controllers/anaFontsController");

const router = express.Router();

router.post("/direct-output", formatingController.doFormating, formatingController.getValidation);
router.post("/direct-output", anaColorController.getColorsDB, anaColorController.getConrastDB);

router.post("/direct-output", anaFontsController.getFontsDB);
router.post("/direct-output", outputController.postOutputPage);

module.exports = router;
