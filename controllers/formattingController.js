const Formatting = require("../models/formattingModel");
const getDb = require("../util/database").getDb;

exports.getInput = (req, res, next) => {
  const formatting = new Formatting();
  formatting
    .getDataFromDB()
    .then(dbData => {
      doFormatInput(dbData);
    })
    .catch(err => {
      console.log(err);
    });
  next();
};

doFormatInput = inputs => {
  const toformatInput = inputs[0].directInput;

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
