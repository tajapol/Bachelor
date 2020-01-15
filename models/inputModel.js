const fs = require("fs");
const path = require("path");
const getDb = require("../util/database").getDb;

//path input
const p = path.join(path.dirname(process.mainModule.filename), "data", "input.css");
//path formatedInput
const p2 = path.join(path.dirname(process.mainModule.filename), "data", "formatedInput.css");

module.exports = class Input {
  constructor(i) {
    this.directInput = i;
  }

  saveInput() {
    const db = getDb();
    return db
      .collection("inputs")
      .insertOne(this)
      .then(inputs => {
        return inputs;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getDataFromDB() {
    const db = getDb();
    return db
      .collection("inputs")
      .find()
      .toArray()
      .then(inputs => {
        return inputs;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
