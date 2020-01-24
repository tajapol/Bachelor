const getDb = require("../util/database").getDb;

module.exports = class DirectInput {
  constructor(dInput) {
    this.directInput = dInput;
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
