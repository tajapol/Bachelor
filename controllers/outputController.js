const Input = require("../models/input");

exports.postOutputPage = (req, res, next) => {
  const input = new Input(req.body.title);
  input.save();
  res.render("index", { pageTitle: "Output" });
};
