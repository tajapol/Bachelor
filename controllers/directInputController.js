exports.getDirectInputPage = (req, res, next) => {
  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, inputUpload: false });
};
