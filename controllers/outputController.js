const Input = require("../models/input");
const Output = require("../models/output");

exports.postOutputPage = (req, res, next) => {
  const input = new Input(req.body.title);

  input.save();
  const output = new Output();
  console.log(output.id);
  res.render("index", { pageTitle: "Output" });
};
