const express = require("express");

const directInputController = require("../controllers/directInputController");

const router = express.Router();

router.get("/direct-input", directInputController.getDirectInputPage);
// router.post("/direct-input", directInputController.saveInputToDB);
module.exports = router;
