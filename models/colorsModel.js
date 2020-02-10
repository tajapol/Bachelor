const getDb = require("../util/database").getDb;

module.exports = class Colors {
  static getColors() {
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

  // static getYellowFromDB() {
  //  for (i = 0; i < yellow.length - 1; i++) {
  //           help.push(yellow[i].rgb.split("/"));
  //         }
  // }
};
