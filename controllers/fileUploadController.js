const FileUpload = require("../models/fileUploadModel");

exports.getFileUploadPage = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, fileUpload: true });
};

exports.postUploadedFile = (req, res, next) => {
  const uploadedFile = req.file;
  next();
};
