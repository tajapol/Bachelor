const express = require("express");

const directInputController = require("../controllers/directInputController");

const router = express.Router();

router.get("/mobile/direct-input", directInputController.getDirectInputPage);
router.get("/desktop/direct-input", directInputController.getDirectInputPage);
router.get("/mobile-and-desktop/direct-input", directInputController.getDirectInputPage);

module.exports = router;
