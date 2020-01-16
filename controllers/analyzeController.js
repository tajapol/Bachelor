const FormatedInput = require("../models/formatedInputModel");
const Analyze = require("../models/analyzeModel");
const Output = require("../models/outputModel");
const getDb = require("../util/database").getDb;

exports.getInput = (req, res, next) => {
  const formIn = new FormatedInput();
  formIn
    .getDataFromDB()
    .then(inputs => {
      // console.log(inputs[0].directInput);
      const formatedInput = doFormatInput(inputs);
      const savedFormInput = saveFormIn(formatedInput);
      return savedFormInput;
    })
    .catch(err => {
      console.log(err);
    });
  next();
};

doFormatInput = inputs => {
  const formatInput = inputs[0].directInput;
  console.log(formatInput);
  return formatInput;
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

exports.postOutputPage = (req, res, next) => {
  // const output = new Output();
  // console.log(output.id);
  res.render("index", { pageTitle: "Output" });
};
