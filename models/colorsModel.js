const getDb = require("../util/database").getDb;

module.exports = class Colors {
  getColors() {
    const db = getDb();
    return db
      .collection("colors")
      .find()
      .toArray()
      .then(colors => {
        return colors;
      })
      .catch(err => {
        console.log(err);
      });
  }

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
