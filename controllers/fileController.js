exports.getFormatsPage = (req, res, next) => {
  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, fileUpload: true });
};
