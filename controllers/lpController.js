exports.getLandingPage = (req, res, next) => {
  req.session.sessionStarted = true;
  res.render("app", { pageTitle: "landingPage", landingPage: true });
};
