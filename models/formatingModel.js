const fs = require("fs");
const path = require("path");
const getDb = require("../util/database").getDb;

module.exports = class Analyze {
  constructor(f) {
    this.toFormat = f;
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
