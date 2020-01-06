const Input = require("../models/input");

exports.getDirectInput = (req, res, next) => {
  res.render("index", {
    pageTitle: "Direct Input"
  });
};

// exports.postDirectInput = (req, res, next) => {
//   const product = new Product(req.body.title);
//   product.save();
//   res.redirect("/");
// };

exports.getInputs = (req, res, next) => {
  const inputs = Product.fetchAll();
  res.render("shop", {
    prods: inputs,
    pageTitle: "Shop",
    path: "/",
    hasinputs: inputs.length > 0,
    activeShop: true,
    productCSS: true
  });
};
