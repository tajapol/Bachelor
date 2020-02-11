const Colors = require("../models/colorsModel");
const c = new Colors();
const Fonts = require("../models/fontsModel");
const f = new Fonts();

const fs = require("fs");

//Colors////////////////////////////////////////////////
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

//Fonts////////////////////////////////////////////////
exports.getFontsDB = (req, res, next) => {
  f.getFonts()
    .then(fonts => {
      res.locals.fontsDB = fonts;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getSerifDB = (req, res, next) => {
  f.getSerif()
    .then(serif => {
      res.locals.serifDB = serif;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getSansSerifDB = (req, res, next) => {
  f.getSansSerif()
    .then(sansSerif => {
      res.locals.sansSerifDB = sansSerif;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getMonospaceDB = (req, res, next) => {
  f.getMonospace()
    .then(monospace => {
      res.locals.monospaceDB = monospace;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getFantasyDB = (req, res, next) => {
  f.getFantasy()
    .then(fantasy => {
      res.locals.fantasyDB = fantasy;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};
