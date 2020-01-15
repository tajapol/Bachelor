const Input = require("../models/inputModel");
const Analyze = require("../models/analyzeModel");
const Output = require("../models/outputModel");
const getDb = require("../util/database").getDb;

exports.getInput = (req, res, next) => {
  const input = new Input();
  input
    .getDataFromDB()
    .then(inputs => {
      // console.log(inputs[0].directInput);
      const formatedInput = doFormatInput(inputs);
      const toSaveFormIn = saveFormIn(formatedInput);
      return toSaveFormIn;
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
    .insertOne({ help: formatedInput })
    .then(formatedInputs => {
      return formatedInputs;
    })
    .catch(err => {
      console.log(err);
    });
};

// .doFormatInput(dbInput)
// .then(dbInput => {
//   const formatInput = doFormatInput(dbInput);
//   // console.log(formatInput);
//   return formatInput;
// })
// .catch(err => {
//   console.log(err);
// })

// .saveFormatedInput(formatInput)
// .then(formatInput => {
//   const savedFormatInput = doFormatInput(formatInput);
//   // console.log(savedFormatInput);
//   return savedFormatInput;
// })
// .catch(err => {
//   console.log(err);
// });
//   next();
// };

exports.postOutputPage = (req, res, next) => {
  // const output = new Output();
  // console.log(output.id);
  res.render("index", { pageTitle: "Output" });
};
