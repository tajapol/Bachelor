exports.getDirectInputPage = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }

  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, inputUpload: true });
};

exports.postDirectInput = (req, res, next) => {
  console.log("Hallo");
  if (!req.body.directInput) {
    res.status(422).render("index", {
      pageTitle: "choose Upload",
      uploadChoosen: true,
      inputUpload: true,
      noInput: true
    });
  } else {
    next();
  }
};
