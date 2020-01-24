const express = require("express");

const fileUploadController = require("../controllers/fileUploadController");
const outputController = require("../controllers/outputController");

const router = express.Router();

// router.post("/direct-output", formattingController.getDirecInput);
// router.post("/direct-output", formattingController.getValidation);
router.post("/file-output", fileUploadController.postUploadedFile);
router.post("/file-output", outputController.postOutputPage);

module.exports = router;
