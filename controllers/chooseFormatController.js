exports.getFormatsPage = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.render("app", { pageTitle: "Choose your format", formatNotChoosen: true });
};
