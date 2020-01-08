const Input = require("../models/input");

exports.getInput = (req, res, next) => {
  const input = new Input(req.body.title);
  // console.log(input);
  input.save();
  next();
};

exports.getInputsAll = (req, res, next) => {
  const inputs = Input.fetchAll();
  // next();
};

// exports.inputs = inputs;
