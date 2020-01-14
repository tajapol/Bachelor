const express = require("express");

const directInputController = require("../controllers/fileUploadController");

const router = express.Router();

router.get("/file-upload", directInputController.getFileUploadPage);

module.exports = router;
