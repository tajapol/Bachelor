const express = require("express");

// import presets controller
const fileUploadController = require("../controllers/fileUploadController");

const router = express.Router();

router.get("/mobile", fileUploadController.getMobileFormat);
router.get("/desktop", fileUploadController.getDesktopFormat);
router.get("/mobileAndDesktop", fileUploadController.getMobileANdDesktopFormat);

module.exports = router;
