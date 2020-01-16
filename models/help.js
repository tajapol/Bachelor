const Input = require("../models/inputModel");
const formatedInput = require("../models/formatedInputModel");
const Output = require("../models/outputModel");

// let formIn = [];

exports.getInput = (req, res, next) => {
  const input = new Input();
  input
    .getDataFromDB()
    .then(inputs => {
      // console.log(inputs[0].directInput);
      const formIn = doFormatInput(inputs);
      return formIn;
    })
    .catch(err => {
      console.log(err);
    });
  next();
};

doFormatInput = inputs => {
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
};

exports.saveFormIn = (req, res, next) => {
  console.log("save from in");

  const formatedInput = new formatedInput();
  // const id = input.id;
  input
    .saveFormatedInput()
    .then(inputs => {
      // console.log(inputs[0]);
    })
    .catch(err => {
      console.log(err);
    });
  next();
};

exports.postOutputPage = (req, res, next) => {
  // const output = new Output();
  // console.log(output.id);
  res.render("index", { pageTitle: "Output" });
};
