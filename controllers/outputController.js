const Analyze = require("../models/analyzeModel");
const ana = new Analyze();

exports.postOutputPage = (req, res, next) => {
  const result = ana.doAnalyze();
  req.session.destroy();
  res.render("output", { pageTitle: "Output", color: result[0], fonts: result[1] });
};
