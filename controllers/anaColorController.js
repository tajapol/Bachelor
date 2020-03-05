const Colors = require("../models/colorsModel");
const c = new Colors();
const Contrast = require("../models/contrastModel");
const con = new Contrast();

exports.getColorsDB = (req, res, next) => {
  c.getColors()
    .then(colors => {
      res.locals.colorsDB = colors;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getConrastDB = (req, res, next) => {
  con
    .getContrast()
    .then(contrast => {
      res.locals.contrastDB = contrast;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};
