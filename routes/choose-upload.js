const express = require("express");

const chooseUploadController = require("../controllers/chooseUploadController");

const router = express.Router();

router.get("/mobile", chooseUploadController.getMobileUpload);
router.get("/desktop", chooseUploadController.getDesktopUpload);
router.get("/mobile-and-desktop", chooseUploadController.getMobileAndDesktopUpload);

module.exports = router;
