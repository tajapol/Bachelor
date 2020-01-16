const Formatting = require("../models/formatingModel");
const fs = require("fs");
const path = require("path");
const getDb = require("../util/database").getDb;

//path formatedInput
const p2 = path.join(path.dirname(process.mainModule.filename), "data", "formatedInput.css");

exports.getInput = (req, res, next) => {
  const formatting = new Formatting();
  formatting
    .getDataFromDB()
    .then(dbData => {
      const formatedInput = doFormatInput(dbData);
      // const savedFormInput = saveFormIn(formatedInput);
      // return savedFormInput;
    })
    .catch(err => {
      console.log(err);
    });
  next();
};

doFormatInput = inputs => {
  const formatInput = inputs[0].directInput;
  // // console.log(formatInput);
  // return formatInput;
  var postcss = require("postcss");
  var stylelint = require("stylelint");

  // CSS to be processed
  var css = inputs[0].directInput;
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
    .process(css, { from: formatInput, to: p2 })
    .then(function(result) {
      saveFormIn(result.css);
      // if (result.map) fs.writeFileSync(p2.map, result.map);
    })
    .catch(err => console.error(err.stack));
};

saveFormIn = formatedInput => {
  const db = getDb();
  return db
    .collection("formatedInputs")
    .insertOne({ formatedInput: formatedInput })
    .then(formatedInputs => {
      return formatedInputs;
    })
    .catch(err => {
      console.log(err);
    });
};
