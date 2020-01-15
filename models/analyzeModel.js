const fs = require("fs");
const path = require("path");
const getDb = require("../util/database").getDb;

//path input
const p = path.join(path.dirname(process.mainModule.filename), "data", "input.css");
//path formatedInput
const p2 = path.join(path.dirname(process.mainModule.filename), "data", "formatedInput.css");

module.exports = class Analyze {
  constructor(f) {
    this.toFormat = f;
  }
  getDataFromDB() {
    const db = getDb();
    return db
      .collection("inputs")
      .find()
      .toArray()
      .then(inputs => {
        return inputs;
      })
      .catch(err => {
        console.log(err);
      });
  }
  doFormatInput() {
    const formatInput = inputs[0].directInput;
    // console.log(formatInput);
    return formatInput;

    // var postcss = require("postcss");
    // var stylelint = require("stylelint");

    // // CSS to be processed
    // var css = fs.readFileSync(p, "utf8");
    // postcss([
    //   require("postcss-import")({
    //     plugins: [
    //       require("stylelint")({
    //         /* your options */
    //       })
    //     ]
    //   }),
    //   require("postcss-cssnext"),
    //   require("postcss-reporter")({ clearReportedMessages: true })
    // ])
    //   .process(css, { from: p, to: p2 })
    //   .then(function(result) {
    //     fs.writeFileSync(p2, result.css);
    //     if (result.map) fs.writeFileSync(p2.map, result.map);
    //   })
    //   .catch(err => console.error(err.stack));
  }

  saveFormatedInput() {
    const db = getDb();
    return db
      .collection("formatedInputs")
      .insertOne(this)
      .then(formatedInputs => {
        return formatedInputs;
      })
      .catch(err => {
        console.log(err);
      });
  }
};

// exports.saveFormIn = (req, res, next) => {
//   console.log("save from in");
//   const help = format;
//   const formatedInput = new FormatedInput(help);
//   formatedInput
//     .saveFormatedInput()
//     .then(inputs => {
//       // console.log(inputs[0]);
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   next();
// };
