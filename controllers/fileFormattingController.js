const Formatting = require("../models/formattingModel");
const formatting = new Formatting();

exports.getUploadedFile = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }

  formatting.validation = true;
  const currentUpload = req.file.path;
  doFormatUpload(currentUpload);

  setTimeout(function() {
    next();
  }, 3000);
};

doFormatUpload = currentUpload => {
  const fs = require("fs");
  let postcss = require("postcss");
  const toformatUpload = fs.readFileSync(currentUpload, "utf8");

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
      fs.unlinkSync(currentUpload, err => {
        if (err) {
          console.error(err);
          return;
        }
      });
    })
    .catch(err => {
      console.error("no CSS");
      formatting.validation = false;
    });
};

exports.getValidation = (req, res, next) => {
  if (formatting.validation == false) {
    res.status(422).render("index", { pageTitle: "choose Upload", uploadChoosen: true, fileUpload: true, redirected: true });
  } else {
    next();
  }
  // formatting.validation = null;
};
