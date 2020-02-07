const getDb = require("../util/database").getDb;

module.exports = class Colors {
  constructor() {
    this.yellow = [];
    this.hex = String;
    this.rgb = String;
  }

  //   getAllColors() {
  //     shade = this.getYellow();
  //   }

  getYellow() {
    this.yellow = getYellowFromDB();
    return this.yellow;
  }
};

getYellowFromDB = () => {
  const db = getDb();
  return (
    db
      .collection("colors")
      .find({ shade: "yellow" })
      // .find()
      .toArray()
      .then(yellow => {
        // for (i = 0; i < colors.length - 1; i++) {
        //   console.log(colors[i].rgb.split("/"));
        // }
        console.log("Hallo");
        return yellow;
      })
      .catch(err => {
        console.log(err);
      })
  );
};
