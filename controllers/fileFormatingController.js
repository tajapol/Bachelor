const fs = require("fs");
const Formating = require("../models/formatingModel");
const formating = new Formating();

exports.doFormating = (req, res, next) => {
  let postcss = require("postcss");
  const toformatUpload = fs.readFileSync(req.file.path, "utf8");

  postcss([
    require("postcss-import")({
      plugins: [require("stylelint")({})]
    }),
    require("postcss-cssnext"),
    require("postcss-reporter")({ clearReportedMessages: true })
  ])
    .process(toformatUpload, { from: toformatUpload })
    .then(formatedUpload => {
      formating.saveFormated(formatedUpload.css);
      res.locals.formated = formatedUpload.css;
      res.locals.notFormated = toformatUpload;
      next();
    })
    .catch(err => {
      console.error("no CSS");
      formating.validation = false;
      next();
    });
};

exports.getValidation = (req, res, next) => {
  if (formating.validation == false) {
    fs.unlinkSync(req.file.path, err => {
      if (err) {
        throw new Error(err);
        return;
      }
    });
    res.status(422).render("app", { pageTitle: "choose Upload", uploadChoosen: true, fileUpload: true, redirected: true });
  } else {
    next();
  }
  formating.validation = true;
};
