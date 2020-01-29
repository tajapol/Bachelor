exports.get404 = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.status(404).render("errorPages", { pageTitle: "Page not found", error404: true });
};

exports.get500 = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.status(500).render("errorPages", { pageTitle: "Problems" });
};
