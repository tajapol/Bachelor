const getDb = require("../util/database").getDb;

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
};
