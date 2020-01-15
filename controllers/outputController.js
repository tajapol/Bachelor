const Input = require("../models/inputModel");
const Output = require("../models/outputModel");

exports.getInput = (req, res, next) => {
  // const directInput = req.body.title;
  const input = new Input();
  // const id = input.id;
  input
    .getDataFromDB()
    .then(inputs => {
      // console.log(inputs[0].directInput);
      const formIn = formatInput(inputs);
      return formIn;
    })
    .catch(err => {
      console.log(err);
    });
  next();
};

formatInput = inputs => {
  // const formatInput = inputs[0].directInput;
  // console.log(inputs[0].directInput);
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
  // const directInput = req.body.title;
  const input = new Input();
  // const id = input.id;
  input
    .saveFormatedInput()
    .then(inputs => {})
    .catch(err => {
      console.log(err);
    });
  next();
};

exports.postOutputPage = (req, res, next) => {
  // const directInput = req.body.title;
  // const input = new Input(directInput);
  // const id = input.id;
  // input
  //   .formatInput()
  //   .then(inputs => {
  //     console.log("format comes");
  //     // console.log("Created Input");
  //     // res.redirect("/direct-input");
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // const output = new Output();
  // console.log(output.id);
  res.render("index", { pageTitle: "Output" });
};
