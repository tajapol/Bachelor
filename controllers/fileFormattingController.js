const Formatting = require("../models/formattingModel");
const formatting = new Formatting();

exports.postUploadedFile = (req, res, next) => {
  if (!req.file) {
    res.status(422).render("index", { pageTitle: "choose Upload", uploadChoosen: true, fileUpload: true, noFile: true });
  } else {
    next();
  }
};

exports.doFormatting = (req, res, next) => {
  const fs = require("fs");
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
      formatting.saveFormatted(formatedUpload.css);
      fs.unlinkSync(req.file.path, err => {
        if (err) {
          console.error(err);
          return;
        }
      });
      next();
    })
    .catch(err => {
      console.error("no CSS");
      formatting.validation = false;
      next();
    });
};

exports.getValidation = (req, res, next) => {
  if (formatting.validation == false) {
    res.status(422).render("index", { pageTitle: "choose Upload", uploadChoosen: true, fileUpload: true, redirected: true });
  } else {
    next();
  }
  formatting.validation = true;
};
