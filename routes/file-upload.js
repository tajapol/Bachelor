const express = require("express");

const fileUploadController = require("../controllers/fileUploadController");

const router = express.Router();

router.get("/file-upload", fileUploadController.getFileUploadPage);

module.exports = router;
