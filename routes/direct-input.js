const express = require("express");

const directInputController = require("../controllers/directInputController");

const router = express.Router();

router.get("/mobile/file-upload", directInputController.getChoosenFormat);
router.get("/desktop/file-upload", directInputController.getChoosenFormat);
router.get("/mobile-and-desktop/file-upload", directInputController.getChoosenFormat);

router.get("/mobile/direct-input", directInputController.getDirectInputPage);
router.get("/desktop/direct-input", directInputController.getDirectInputPage);
router.get("/mobile-and-desktop/direct-input", directInputController.getDirectInputPage);
router.post("/direct-output", directInputController.postDirectInput);

module.exports = router;
