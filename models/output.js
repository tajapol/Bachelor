const fs = require("fs");
const path = require("path");
const Input = require("../models/input");

// const p = path.join(path.dirname(process.mainModule.filename), "data", "inputs.css");

module.exports = class Output {
  constructor() {
    // this.input = i;
    const input = new Input();
    console.log(input.id);
    this.id = input.id;
  }
};
