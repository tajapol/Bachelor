const Input = require("../models/inputModel");

exports.getDirectInputPage = (req, res, next) => {
  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, inputUpload: true });
};

exports.saveInputToDB = (req, res, next) => {
  const directInput = req.body.title;
  const input = new Input(directInput);
  const id = input.id;
  input
    .save()
    .then(inputs => {
      // console.log(inputs);
      // console.log("Created Input");
      // res.redirect("/direct-input");
    })
    .catch(err => {
      console.log(err);
    });
  // const output = new Output();
  // console.log(output.id);
  // res.redirect("/direct-input");
  next();
};

// exports.saveI = (req, res, next) => {
//   const directInput = req.body.title;
//   const input = new Input(directInput);
//   const id = input.id;
//   input.getDataFromDB
//     .then(inputs => {
//       // console.log();
//       console.log("huhu");
//       res.redirect("/direct-input");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
