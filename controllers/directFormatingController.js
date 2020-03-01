const Formating = require("../models/formatingModel");
const formating = new Formating();

exports.doFormating = (req, res, next) => {
  const toformatInput = req.body.directInput;
  let postcss = require("postcss");

  postcss([
    require("postcss-import")({
      plugins: [require("stylelint")({})]
    }),
    require("postcss-cssnext"),
    require("postcss-reporter")({ clearReportedMessages: true })
  ])
    .process(toformatInput, { from: toformatInput })
    .then(formatedInput => {
      formating.saveFormatted(formatedInput.css);
      res.locals.formatted = formatedInput.css;
      res.locals.notFormatted = toformatInput;

      next();
    })
    .catch(err => {
      console.error("no CSS");
      formating.validation = false;
      next();
    });
};

exports.getValidation = (req, res, next) => {
  const directInput = req.body.directInput;

  if (formating.validation == false) {
    res.status(422).render("app", {
      pageTitle: "choose Upload",
      uploadChoosen: true,
      inputUpload: true,
      redirected: true,
      oldInput: directInput
    });
  } else {
    next();
  }
  formating.validation = true;
};
