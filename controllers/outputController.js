const Input = require("../models/inputModel");
const Output = require("../models/outputModel");

exports.postOutputPage = (req, res, next) => {
  const directInput = req.body.title;
  const input = new Input(directInput);
  const id = input.id;
  input
    .getDataFromDB()
    .then(inputs => {
      console.log(inputs[0].directInput);
      console.log("Created Input");
      // res.redirect("/direct-input");
    })
    .catch(err => {
      console.log(err);
    });
  // const output = new Output();
  // // console.log(output.id);
  res.render("index", { pageTitle: "Output" });
};
