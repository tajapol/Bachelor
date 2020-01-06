const Input = require("../models/input");

console.log("hello");

exports.getDirectInput = (req, res, next) => {
  res.render("index", {
    pageTitle: "Direct Input"
  });
};

exports.postDirectInput = (req, res, next) => {
  const input = new Input(req.body.title);
  input.save();
  res.redirect("/");
};

exports.getInputs = (req, res, next) => {
  const inputs = Input.fetchAll();
  res.render("shop", {
    prods: inputs,
    pageTitle: "Shop",
    path: "/",
    hasinputs: inputs.length > 0,
    activeShop: true,
    productCSS: true
  });
};
