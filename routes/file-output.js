const express = require("express");

const formatingController = require("../controllers/fileFormatingController");
const outputController = require("../controllers/outputController");
const anaColorController = require("../controllers/anaColorController");
const anaFontsController = require("../controllers/anaFontsController");

const router = express.Router();

router.post("/file-output", formatingController.doFormating, formatingController.getValidation);
router.post("/file-output", anaColorController.getColorsDB, anaColorController.getConrastDB);
router.post("/file-output", anaFontsController.getFontsDB);
router.post("/file-output", outputController.postOutputPage);

module.exports = router;
