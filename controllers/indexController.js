exports.getLandingPage = (req, res, next) => {
  res.render("index", { pageTitle: "landingPage" });
};
