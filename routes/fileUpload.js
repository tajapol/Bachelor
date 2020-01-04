const express = require("express");

const fileController = require("../controllers/fileController");

const router = express.Router();

router.get("/fileUpload", fileController.getFormatsPage);

module.exports = router;
