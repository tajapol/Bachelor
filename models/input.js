// upload class
const fs = require("fs");
const p = require("path");

const inputs = [];

module.exports = class Input {
  constructor(t) {
    this.title = t;
  }

  save() {
    // create a path
    // const path = p.join(path.dirname(process.mainModule.filename), "data", "input.txt");
    // fs.readFile(path, (err, fileContent) => {
    //   console.log(fileContent);

    inputs.push(this);
    console.log(inputs);
    // });
  }

  //makes sue that I can call the method directly on the class itself and on instantiated object
  static fetchAll() {
    return inputs;
  }
};

// const input = JSON.parse(JSON.stringify(req.body.title));
// const title = input;
// inputs.push({ title });
// console.log(inputs);
