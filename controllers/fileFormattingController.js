const fs = require("fs");
const Formatting = require("../models/formattingModel");
const formatting = new Formatting();

exports.doFormatting = (req, res, next) => {
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

      const Analyze = require("../models/analyzeModel");
      const analyze = new Analyze();
      analyze.doAnalyze(formatedUpload.css);

      // deleteFile(req);
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
    // deleteFile(req);
    res.status(422).render("index", { pageTitle: "choose Upload", uploadChoosen: true, fileUpload: true, redirected: true });
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
