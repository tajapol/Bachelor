const express = require("express");

// import presets controller
const uploadController = require("../controllers/uploadController");

const router = express.Router();

router.get("/mobile", uploadController.getMobileFormat);
router.get("/desktop", uploadController.getDesktopFormat);
router.get("/mobileAndDesktop", uploadController.getMobileANdDesktopFormat);

module.exports = router;
