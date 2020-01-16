exports.getLandingPage = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.render("index", { pageTitle: "landingPage", landingPage: true });
};
