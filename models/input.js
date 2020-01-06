// upload class
const fs = require("fs");
const path = require("path");

module.exports = class Input {
  constructor(t) {
    this.title = t;
  }

  save() {
    // create a path
    const p = path.join(__dirname, "data", "inputs.json");
  }

  //makes sue that I can call the method directly on the class itself and on instantiated object
  static fetchAll() {
    return inputs;
  }
};
