const express = require("express");

const inputController = require("../controllers/inputController");

const router = express.Router();

router.get("/input", inputController.getDirectInputPage);
router.get("/file-upload", inputController.getFileUploadPage);

module.exports = router;
