const express = require("express");

const outputController = require("../controllers/outputController");

const router = express.Router();

router.get("/output", outputController.getOutputPage);
router.post("/output", outputController.postOutputPage);

module.exports = router;
