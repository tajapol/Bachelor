const fs = require("fs");
const path = require("path");

module.exports = class Input {
  constructor(title) {
    this.directInput = title;
  }

  save() {
    const p = path.join(path.dirname(process.mainModule.filename), "data", "inputs.json");
    fs.readFile(p, (err, fileContent) => {
      let inputs = [];
      if (!err) {
        inputs = JSON.parse(fileContent);
      }
      inputs.push(this);
      fs.writeFile(p, JSON.stringify(inputs), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(path.dirname(process.mainModule.filename), "data", "inputs.json");
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
