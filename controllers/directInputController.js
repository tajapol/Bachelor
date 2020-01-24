const Input = require("../models/inputModel");

exports.getDirectInputPage = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, inputUpload: true });
};

exports.saveInputToDB = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  const directInput = req.body.dire;
  const id = req.sessionID;
  const input = new Input(directInput, id);
  input
    .saveInput()
    .then(inputs => {})
    .catch(err => {
      console.log(err);
    });
  next();
};
