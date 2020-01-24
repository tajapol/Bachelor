const Formatting = require("../models/formattingModel");
const formatting = new Formatting();

exports.getDirecInput = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }

  formatting.validation = true;
  const currentUpload = req.file;
  console.log(currentUpload);
  const formatedUpload = doFormatUpload(currentUpload);

  setTimeout(function() {
    next();
  }, 3000);
};

doFormatUpload = currentUpload => {
  const toformatUpload = currentUpload;
  let postcss = require("postcss");

  postcss([
    require("postcss-import")({
      plugins: [require("stylelint")({})]
    }),
    require("postcss-cssnext"),
    require("postcss-reporter")({ clearReportedMessages: true })
  ])
    .process(toformatUpload, { from: toformatUpload })
    .then(formatedUpload => {
      saveFormIn(formatedUpload.css);
    })
    .catch(err => {
      console.error("no CSS");
      formatting.validation = false;
    });
};

saveFormIn = formatedUpload => {
  const getDb = require("../util/database").getDb;
  const db = getDb();
  return db
    .collection("formatedUploads")
    .insertOne({ formatedUpload: formatedUpload })
    .then(formatedUpload => {})
    .catch(err => {
      console.log(err);
    });
};

exports.getValidation = (req, res, next) => {
  const directInput = req.body.directInput;

  if (formatting.validation == false) {
    res.status(422).render("index", { pageTitle: "choose Upload", uploadChoosen: true, fileUpload: true, redirected: true });
  } else {
    next();
  }
  formatting.validation = null;
};
