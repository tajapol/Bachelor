const getDb = require("../util/database").getDb;

module.exports = class Contrast {
  getContrast() {
    const db = getDb();
    return db
      .collection("contrasts")
      .find()
      .toArray()
      .then(colors => {
        return colors;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
