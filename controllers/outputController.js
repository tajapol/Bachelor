exports.getOutputPage = (req, res, next) => {
  res.render("index", { pageTitle: "Output" });
};

exports.postOutputPage = (req, res, next) => {
  res.render("index", { pageTitle: "Output" });
};
