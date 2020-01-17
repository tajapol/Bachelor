const Formatting = require("../models/formattingModel");
const getDb = require("../util/database").getDb;

exports.getInput = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  const sessionId = req.sessionID;
  const formatting = new Formatting();
  formatting
    .getDataFromDB()
    .then(dbData => {
      getCurrentInput(dbData, sessionId);
    })
    .catch(err => {
      console.log(err);
    });
  next();
};

getCurrentInput = (dbData, sessionId) => {
  for (var i = 0; i < dbData.length; i++) {
    if (dbData[i].sID == sessionId) {
      const currentInput = dbData[i].directInput;
      doFormatInput(currentInput);
    }
    i++;
  }
};

doFormatInput = currentInput => {
  const toformatInput = currentInput;

  var postcss = require("postcss");
  var stylelint = require("stylelint");

  postcss([
    require("postcss-import")({
      plugins: [
        require("stylelint")({
          /* your options */
        })
      ]
    }),
    require("postcss-cssnext"),
    require("postcss-reporter")({ clearReportedMessages: true })
  ])
    .process(toformatInput, { from: toformatInput })
    .then(formatedInput => {
      saveFormIn(formatedInput.css);
    })
    .catch(err => console.error(err.stack));
};

saveFormIn = formatedInput => {
  const db = getDb();
  return db
    .collection("formatedInputs")
    .insertOne({ formatedInput: formatedInput })
    .then(formatedInputs => {})
    .catch(err => {
      console.log(err);
    });
};
