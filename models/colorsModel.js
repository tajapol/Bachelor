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

  getYellow() {
    const db = getDb();
    return db
      .collection("colors")
      .find({ shade: "yellow" })
      .toArray()
      .then(yellow => {
        return yellow;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getBlue() {
    const db = getDb();
    return db
      .collection("colors")
      .find({ shade: "blue" })
      .toArray()
      .then(blue => {
        return blue;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getBrown() {
    const db = getDb();
    return db
      .collection("colors")
      .find({ shade: "brown" })
      .toArray()
      .then(brown => {
        return brown;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getGray() {
    const db = getDb();
    return db
      .collection("colors")
      .find({ shade: "gray" })
      .toArray()
      .then(gray => {
        return gray;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getGreen() {
    const db = getDb();
    return db
      .collection("colors")
      .find({ shade: "green" })
      .toArray()
      .then(green => {
        return green;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getOrange() {
    const db = getDb();
    return db
      .collection("colors")
      .find({ shade: "orange" })
      .toArray()
      .then(orange => {
        return orange;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getRed() {
    const db = getDb();
    return db
      .collection("colors")
      .find({ shade: "red" })
      .toArray()
      .then(red => {
        return red;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getViolett() {
    const db = getDb();
    return db
      .collection("colors")
      .find({ shade: "violet" })
      .toArray()
      .then(violett => {
        return violett;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getWhite() {
    const db = getDb();
    return db
      .collection("colors")
      .find({ shade: "white" })
      .toArray()
      .then(White => {
        return White;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
