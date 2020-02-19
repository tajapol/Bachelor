let choosenFormat = String;

exports.getChoosenFormat = (req, res, next) => {
  choosenFormat = req.path;
  next();
};

exports.getFileUploadPage = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, fileUpload: true });
};

exports.postUploadedFile = (req, res, next) => {
  if (!req.file) {
    res.status(422).render("index", { pageTitle: "choose Upload", uploadChoosen: true, fileUpload: true, noFile: true });
  } else {
    if (choosenFormat.includes("mobile-and-desktop")) {
      res.locals.choosenFormat = "both";
    } else if (choosenFormat.includes("/mobile/file-upload")) {
      res.locals.choosenFormat = "mobile";
    } else {
      res.locals.choosenFormat = "desktop";
    }
    next();
  }
};
