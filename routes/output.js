const express = require("express");

// const directInputController = require("../controllers/directInputController");
const formattingController = require("../controllers/formattingController");
const outputController = require("../controllers/outputController");
const fileUploadController = require("../controllers/fileUploadController");

const router = express.Router();

router.post("/output", fileUploadController.postUploadedFile);
router.post("/output", formattingController.getDirecInput);

router.post("/output", formattingController.getValidation);

router.post("/output", outputController.postOutputPage);

module.exports = router;
