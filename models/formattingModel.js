const getDb = require("../util/database").getDb;

module.exports = class Formatting {
  constructor(v, f) {
    this.validation = v;
    this.toFormat = f;
  }

  saveFormIn() {
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
