module.exports = class Formatting {
  constructor(v, f) {
    this.validation = v;
    this.toFormat = f;
  }

  saveFormatted(f) {
    const getDb = require("../util/database").getDb;
    const db = getDb();
    return db
      .collection("formatted")
      .insertOne({ formattedContent: f })
      .then(formatedUpload => {
        return formatedUpload;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
