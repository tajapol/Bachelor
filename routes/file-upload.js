const express = require("express");

const fileUploadController = require("../controllers/fileUploadController");

const router = express.Router();

router.get("/mobile/file-upload", fileUploadController.getFileUploadPage);
router.get("/desktop/file-upload", fileUploadController.getFileUploadPage);
router.get("/mobile-and-desktop/file-upload", fileUploadController.getFileUploadPage);
router.post("/file-output", fileUploadController.postUploadedFile);

module.exports = router;
