const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(process.mainModule.filename), "data", "inputs.css");

module.exports = class Input {
  constructor(t) {
    this.directInput = t;
  }

  save() {
    fs.writeFile(p, this.directInput, err => {
      console.log(err);
    });
  }
};
