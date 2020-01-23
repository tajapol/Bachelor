const validation = true;

exports.getInput = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }

  const currentInput = req.body.directInput;
  const formatedInput = doFormatInput(currentInput);

  setTimeout(function() {
    next();
  }, 3000);
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
      saveFormIn(formatedInput.css);
    })
    .catch(err => {
      console.error("no CSS");
      validation = false;
    });
};

saveFormIn = formatedInput => {
  const db = getDb();
  return db
    .collection("formatedInputs")
    .insertOne({ formatedInput: formatedInput })
    .then(formatedInput => {
      return formatedInput;
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getValidation = (req, res, next) => {
  const userInput = req.body.directInput;
  console.log(userInput);
  if (validation == false) {
    res.status(422).render("index", { pageTitle: "choose Upload", uploadChoosen: true, inputUpload: true });
  } else {
    next();
  }
  validation == null;
};
