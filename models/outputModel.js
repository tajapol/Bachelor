const Input = require("./inputModel");

module.exports = class Output {
  constructor() {
    const input = new Input();
    this.id = input.id;
  }
};
