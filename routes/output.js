const express = require("express");

const outputController = require("../controllers/outputController");

const router = express.Router();

router.post("/output", outputController.postOutputPage);

inputs = outputController.inputs;

module.exports = router;
