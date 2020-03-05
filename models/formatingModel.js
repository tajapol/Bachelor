module.exports = class Formating {
  constructor(v, f) {
    this.validation = v;
    this.toFormat = f;
  }

  saveFormated(f) {
    const getDb = require("../util/database").getDb;
    const db = getDb();
    return db
      .collection("formated")
      .insertOne({ formatedContent: f })
      .then(formatedUpload => {
        return formatedUpload;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
