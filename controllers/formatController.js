exports.getFormatsPage = (req, res, next) => {
  res.render("main", { pageTitle: "Choose your format", formatNotChoosen: true });
};
