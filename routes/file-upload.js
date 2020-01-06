const express = require("express");

const fileController = require("../controllers/fileController");

const router = express.Router();

router.get("/file-upload", fileController.getFormatsPage);

module.exports = router;
