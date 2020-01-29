const express = require("express");

const formattingController = require("../controllers/fileFormattingController");
const outputController = require("../controllers/outputController");

const router = express.Router();

router.post("/file-output", formattingController.postUploadedFile);
router.post("/file-output", formattingController.doFormatting);
router.post("/file-output", formattingController.getValidation);
router.post("/file-output", outputController.postOutputPage);

module.exports = router;
