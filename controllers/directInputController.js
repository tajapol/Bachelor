let choosenFormat = "placeholder";

exports.getDirectInputPage = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }

  res.render("app", { pageTitle: "choose Upload", uploadChoosen: true, inputUpload: true });
};

exports.postDirectInput = (req, res, next) => {
  if (!req.body.directInput) {
    res.status(422).render("app", {
      pageTitle: "choose Upload",
      uploadChoosen: true,
      inputUpload: true,
      noInput: true
    });
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
