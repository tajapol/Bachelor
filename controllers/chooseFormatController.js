exports.getFormatsPage = (req, res, next) => {
  res.render("index", { pageTitle: "Choose your format", formatNotChoosen: true });
};
