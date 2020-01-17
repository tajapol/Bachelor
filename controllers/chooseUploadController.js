exports.getMobileFormat = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.render("index", { pageTitle: "choose your upload", mobile: true, version: "mobile", uploadNotChoosen: true });
};

exports.getDesktopFormat = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.render("index", { pageTitle: "choose your upload", desktop: true, version: "desktop", uploadNotChoosen: true });
};

exports.getMobileANdDesktopFormat = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.render("index", { pageTitle: "choose your upload", both: true, version: "mobile and desktop", uploadNotChoosen: true });
};
