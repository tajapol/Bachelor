exports.getMobileFormat = (req, res, next) => {
  res.render("main", { pageTitle: "choose your upload", uploads: true, version: "uploads", uploadNotChoosen: true });
};

exports.getDesktopFormat = (req, res, next) => {
  res.render("main", { pageTitle: "choose your upload", desktop: true, version: "desktop", uploadNotChoosen: true });
};

exports.getMobileANdDesktopFormat = (req, res, next) => {
  res.render("main", { pageTitle: "choose your upload", both: true, version: "uploads and desktop", uploadNotChoosen: true });
};

exports.postDummy = (req, res, next) => {
  res.redirect("/");
};
