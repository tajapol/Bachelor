const Fonts = require("../models/fontsModel");
const f = new Fonts();

exports.getFontsDB = (req, res, next) => {
  console.error("Fonts");
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
      console.log(serif);
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
