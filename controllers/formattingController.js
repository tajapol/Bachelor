const Formatting = require("../models/formattingModel");
const getDb = require("../util/database").getDb;

exports.getInput = (req, res, next) => {
  if (req.session.sessionStarted != true) {
    req.session.sessionStarted = true;
  }
  const sessionId = req.sessionID;
  deleteInput();
  const formatting = new Formatting();
  formatting.getDataFromDB();
  formatting
    .getDataFromDB()
    .then(dbData => {
      // console.log(sessionId);

      getCurrentInput(dbData, sessionId);
    })
    .catch(err => {
      console.log(err);
    });
  next();
};

getCurrentInput = (dbData, sessionId) => {
  console.log(dbData);
  console.log(sessionId);
  for (var i = 0; i < dbData.length; i++) {
    if (dbData[0].sID == sessionId) {
      let currentInput = dbData[0].directInput;

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
      deleteInput();
    })
    .catch(err => console.error(err.stack));
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

const deleteInput = () => {
  const db = getDb();
  db.collection("inputs").remove(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
  });
};
