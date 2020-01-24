const getDb = require("../util/database").getDb;

module.exports = class FileUpload {
  constructor(fUpload) {
    this.uploadedFile = fUpload;
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
