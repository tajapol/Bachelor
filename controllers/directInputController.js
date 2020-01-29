exports.getDirectInputPage = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }

  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, inputUpload: true });
};
