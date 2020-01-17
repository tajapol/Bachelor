exports.get404 = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.status(404).render("404", { pageTitle: "Page not found" });
};
