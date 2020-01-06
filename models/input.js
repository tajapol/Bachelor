// upload class
const fs = require("fs");
const path = require("path");

module.exports = class Products {
  constructor(t) {
    this.title = t;
  }

  save() {
    const p = path.join(__dirname, "data");
  }

  //makes sue that I can call the method directly on the class itself and on instantiated object
  static fetchAll() {
    return products;
  }
};
