const fs = require("fs");
const path = require("path");
const Input = require("./inputModel");

module.exports = class Output {
  constructor() {
    const input = new Input();
    this.id = input.id;
  }
};
