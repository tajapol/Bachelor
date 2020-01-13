exports.getDirectInputPage = (req, res, next) => {
  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, inputUpload: true });
};

exports.getFileUploadPage = (req, res, next) => {
  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, fileUpload: true });
};
