const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(process.mainModule.filename), "data", "inputs.json");

const getInputFromFile = callB => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callB([]);
    } else {
      data = JSON.parse(fileContent);
      // alert(d.jobtitel);
      console.log(data.directInput);
    }
  });
};

module.exports = class Ana {
  constructor(i) {
    this.input = i;
  }

  analyze() {
    getInputFromFile(inputs => {});
  }

  static fetchAll(callB) {
    getInputFromFile(callB);
  }
};
