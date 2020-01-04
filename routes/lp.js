const express = require("express");

const lpController = require("../controllers/lpController");

const router = express.Router();

router.get("/", lpController.getLandingPage);
module.exports = router;
