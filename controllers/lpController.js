exports.getLandingPage = (req, res, next) => {
  req.session.sessionStarted = true;
  res.render("index", { pageTitle: "landingPage", landingPage: true });
};
