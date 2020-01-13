const fs = require("fs");
const path = require("path");
const Input = require("./inputModel");

// const p = path.join(path.dirname(process.mainModule.filename), "data", "inputs.css");

module.exports = class Output {
  constructor() {
    const input = new Input();
    this.id = input.id;
  }
};
