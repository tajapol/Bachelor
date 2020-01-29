const Analyze = require("../models/analyzeModel");
const ana = new Analyze();

exports.postOutputPage = (req, res, next) => {
  req.session.destroy();
  res.render("output", { pageTitle: "Output", analyze: ana.getResult() });
};
