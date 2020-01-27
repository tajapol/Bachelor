const Formatting = require("../models/formattingModel");
const formatting = new Formatting();

exports.getDirecInput = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }

  formatting.validation = true;
  const currentInput = req.body.directInput;
  doFormatInput(currentInput);

  next();
};

doFormatInput = currentInput => {
  const toformatInput = currentInput;
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
    })
    .catch(err => {
      console.error("no CSS");
      formatting.validation = false;
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
};
