const Analyze = require("../models/analyzeModel");
const ana = new Analyze();
const Colors = require("../models/ColorsModel");
const c = new Colors();

exports.getColorsDB = (req, res, next) => {
  Colors.getColors()
    .then(colors => {
      const file = req.file.path;
      const result = ana.doAnalyze(colors, file);
      next();
    })
    .catch(err => {
      console.log(err);
    });
  fs.unlinkSync(req.file.path, err => {
    if (err) {
      throw new Error(err);
      return;
    }
  });
};
