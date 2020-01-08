const Input = require("../models/input");
const Ana = require("../models/analyze");

exports.postOutputPage = (req, res, next) => {
  const input = new Input(req.body.title);
  const ana = new Ana();
  input.save();
  ana.analyze();
  res.render("index", { pageTitle: "Output" });
};
