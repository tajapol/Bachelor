const Input = require("../models/directInputModel");

exports.getDirectInputPage = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, inputUpload: true });
};

exports.saveInputToDB = (req, res, next) => {
  const di = req.body.directInput;
  const directnput = new DirectInput(di);
  input
    .saveInput()
    .then(inputs => {})
    .catch(err => {
      console.log(err);
    });
  next();
};
