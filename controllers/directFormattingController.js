const Formatting = require("../models/formattingModel");
const formatting = new Formatting();

exports.postDirectInput = (req, res, next) => {
  if (!req.body.directInput) {
    res.status(422).render("index", {
      pageTitle: "choose Upload",
      uploadChoosen: true,
      inputUpload: true,
      noInput: true
    });
  } else {
    next();
  }
};

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
      next();
    })
    .catch(err => {
      console.error("no CSS");
      formatting.validation = false;
      deleteFile(req);
      next();
    });
};

exports.getValidation = (req, res, next) => {
  const directInput = req.body.directInput;

  if (formatting.validation == false) {
    deleteFile(req);
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

deleteFile = req => {
  fs.unlinkSync(req.file.path, err => {
    if (err) {
      throw new Error(err);
      return;
    }
  });
};
