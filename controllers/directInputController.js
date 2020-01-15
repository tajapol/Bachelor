const Input = require("../models/inputModel");

exports.getDirectInputPage = (req, res, next) => {
  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, inputUpload: true });
};

exports.saveInputToDB = (req, res, next) => {
  const directInput = req.body.title;
  const input = new Input(directInput);
  input
    .saveInput()
    .then(inputs => {})
    .catch(err => {
      console.log(err);
    });
  next();
};
