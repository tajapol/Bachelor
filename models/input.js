const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(process.mainModule.filename), "data", "inputs.json");

const getInputFromFile = callB => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callB([]);
    } else {
      callB(JSON.parse(fileContent));
    }
  });
};

module.exports = class Input {
  constructor(t) {
    this.title = t;
  }

  save() {
    getInputFromFile(inputs => {
      inputs.push(this);
      fs.writeFile(p, JSON.stringify(inputs), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(callB) {
    getInputFromFile(callB);
  }
};
