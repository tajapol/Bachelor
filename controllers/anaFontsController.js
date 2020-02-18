const Fonts = require("../models/fontsModel");
const f = new Fonts();

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
