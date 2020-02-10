const Colors = require("../models/ColorsModel");
const c = new Colors();

const fs = require("fs");

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

exports.getYellowDB = (req, res, next) => {
  c.getYellow()
    .then(yellow => {
      res.locals.yellowDB = yellow;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getBlueDB = (req, res, next) => {
  c.getBlue()
    .then(blue => {
      res.locals.blueDB = blue;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getBrownDB = (req, res, next) => {
  c.getBrown()
    .then(brown => {
      res.locals.brownDB = brown;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getGrayDB = (req, res, next) => {
  c.getGray()
    .then(gray => {
      res.locals.grayDB = gray;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getGreenDB = (req, res, next) => {
  c.getGreen()
    .then(green => {
      res.locals.greenDB = green;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getOrangeDB = (req, res, next) => {
  c.getOrange()
    .then(orange => {
      res.locals.orangeDB = orange;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getRedDB = (req, res, next) => {
  c.getRed()
    .then(red => {
      res.locals.redDB = red;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getViolettDB = (req, res, next) => {
  c.getViolett()
    .then(violett => {
      res.locals.violettDB = violett;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getWhiteDB = (req, res, next) => {
  c.getWhite()
    .then(white => {
      res.locals.whiteDB = white;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};
