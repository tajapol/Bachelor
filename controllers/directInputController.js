const Input = require("../models/inputModel");

exports.getDirectInputPage = (req, res, next) => {
  res.render("index", { pageTitle: "choose Upload", uploadChoosen: true, inputUpload: true });
};

exports.saveInput = (req, res, next) => {
  const directInput = req.body.title;
  const input = new Input(directInput);
  const id = input.id;
  input
    .save()
    .then(inputs => {
      // console.log();
      console.log("Created Input");
      // res.redirect("/direct-input");
    })
    .catch(err => {
      console.log(err);
    });
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
