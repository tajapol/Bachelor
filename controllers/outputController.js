const Analyze = require("../models/analyzeModel");
const fs = require("fs");

exports.postOutputPage = (req, res, next) => {
  const ana = new Analyze();
  const result = ana.doAnalyze();

  req.session.destroy();
  // deleteFile(req);

  res.render("index", { pageTitle: "Output", color: result[0], fonts: result[1] });
};
