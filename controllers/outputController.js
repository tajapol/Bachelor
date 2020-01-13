const Input = require("../models/inputModel");
const Output = require("../models/outputModel");

exports.postOutputPage = (req, res, next) => {
  getInput();
  const output = new Output();
  console.log(output.id);
  res.render("index", { pageTitle: "Output" });
};

const getInput = () => {
  const input = new Input();
  const directInput = input.directInput;
  const id = input.id;
  input
    .save()
    .then(result => {
      console.log(result);
      console.log("Created Input");
    })
    .catch(err => {
      //   console.log(err);
    });
};
