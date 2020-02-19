const express = require("express");

const chooseUploadController = require("../controllers/chooseUploadController");

const router = express.Router();

router.get("/mobile", chooseUploadController.getMobileFormat);
router.get("/desktop", chooseUploadController.getDesktopFormat);
router.get("/mobile-and-desktop", chooseUploadController.getMobileANdDesktopFormat);

module.exports = router;
