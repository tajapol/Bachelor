const fs = require("fs");
const path = require("path");
// const prettyCSS = require("PrettyCSS");

const p = path.join(path.dirname(process.mainModule.filename), "data", "inputs.css");

module.exports = class Ana {
  constructor(i) {
    this.input = i;
  }
};
