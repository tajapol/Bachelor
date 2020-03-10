exports.getMobileUpload = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.render("app", { pageTitle: "choose your upload", mobile: true, version: "mobile", uploadNotChoosen: true });
};

exports.getDesktopUpload = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.render("app", { pageTitle: "choose your upload", desktop: true, version: "desktop", uploadNotChoosen: true });
};

exports.getMobileAndDesktopUpload = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.render("app", { pageTitle: "choose your upload", both: true, version: "mobile and desktop", uploadNotChoosen: true });
};
