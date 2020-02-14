const getDb = require("../util/database").getDb;

module.exports = class Fonts {
  getFonts() {
    const db = getDb();
    return db
      .collection("fonts")
      .find()
      .toArray()
      .then(fonts => {
        return fonts;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
