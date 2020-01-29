const fs = require("fs");
const Formatting = require("../models/formattingModel");
const formatting = new Formatting();

exports.getAnalyze = (req, res, next) => {
  next();
};
