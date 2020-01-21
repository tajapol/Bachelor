exports.postOutputPage = (req, res, next) => {
  req.session.destroy();
  res.render("index", { pageTitle: "Output" });
};
