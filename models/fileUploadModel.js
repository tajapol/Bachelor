const getDb = require("../util/database").getDb;

module.exports = class FileUpload {
  constructor(fu) {
    this.uploadedFile = fu;
  }

  saveInput() {
    const db = getDb();
    return db
      .collection("uploads")
      .insertOne(this)
      .then(uploadedFile => {
        return uploadedFile;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
