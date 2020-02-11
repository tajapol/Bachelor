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

  getSerif() {
    const db = getDb();
    return db
      .collection("fonts")
      .find({ fontfamily: "serif" })
      .toArray()
      .then(serif => {
        return serif;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getSansSerif() {
    const db = getDb();
    return db
      .collection("fonts")
      .find({ fontfamily: "sans-serif" })
      .toArray()
      .then(sansserif => {
        return sansserif;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getMonospace() {
    const db = getDb();
    return db
      .collection("fonts")
      .find({ fontfamily: "monospace" })
      .toArray()
      .then(monospace => {
        return monospace;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getFantasy() {
    const db = getDb();
    return db
      .collection("fonts")
      .find({ fontfamily: "fantasy" })
      .toArray()
      .then(fantasy => {
        return fantasy;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
