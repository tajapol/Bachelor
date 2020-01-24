const Formatting = require("../models/formattingModel");
const getDb = require("../util/database").getDb;
const formatting = new Formatting();

exports.getInput = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  const sessionId = req.sessionID;
  formatting.validation = true;

  formatting
    .getDataFromDB()
    .then(dbData => {
      getCurrentInput(dbData, sessionId);
    })
    .catch(err => {
      console.log(err);
    });
  setTimeout(function() {
    next();
  }, 5000);
};

getCurrentInput = (dbData, sessionId) => {
  for (var i = 0; i < dbData.length; i++) {
    if (dbData[i].sID == sessionId) {
      let currentInput = dbData[i].directInput;
      doFormatInput(currentInput);
      console.log(currentInput);
    }
    i++;
  }
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
      formatting.validation = false;
    });
  removeInput();
};

saveFormIn = formatedInput => {
  const db = getDb();
  return db
    .collection("formatedInputs")
    .insertOne({ formatedInput: formatedInput })
    .then(formatedInput => {})
    .catch(err => {
      console.log(err);
    });
};

const removeInput = () => {
  const db = getDb();
  db.collection("inputs").remove(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Input removed");
  });
};

exports.getValidation = (req, res, next) => {
  const userInput = req.body.directInput;
  console.log(userInput);
  console.log("käse");
  if (formatting.validation == false) {
    res.status(422).render("index", { pageTitle: "choose Upload", uploadChoosen: true, inputUpload: true });
  } else {
    next();
  }
  formatting.validation == null;
};
