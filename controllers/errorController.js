exports.get404 = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.status(404).render("app", { pageTitle: "Page not found", error: true, error404: true });
};

exports.get500 = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.status(500).render("app", { pageTitle: "Problems", error: true });
};
