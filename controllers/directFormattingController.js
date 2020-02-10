const Formatting = require("../models/formattingModel");
const formatting = new Formatting();

exports.doFormatting = (req, res, next) => {
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
      formatting.saveFormatted(formatedInput.css);
      res.locals.formatted = formatedInput.css;
      next();
    })
    .catch(err => {
      console.error("no CSS");
      formatting.validation = false;
      next();
    });
};

exports.getValidation = (req, res, next) => {
  const directInput = req.body.directInput;

  if (formatting.validation == false) {
    res.status(422).render("index", {
      pageTitle: "choose Upload",
      uploadChoosen: true,
      inputUpload: true,
      redirected: true,
      oldInput: directInput
    });
  } else {
    next();
  }
  formatting.validation = true;
};
