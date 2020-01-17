const getDb = require("../util/database").getDb;

module.exports = class Input {
  constructor(dInput, id) {
    this.directInput = dInput;
    this.sID = id;
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

getSession = () => {
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
};
