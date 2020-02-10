const getDb = require("../util/database").getDb;
// var path;
module.exports = class Colors {
  constructor() {
    this.yellowShades = [];
    this.hex = String;
    this.rgb = String;
    this.all = [];
    this.path;
  }

  static getYellowFromDB() {
    const db = getDb();

    db.collection("colors", function(err, collection) {
      collection.find().toArray(function(err, results) {
        this.path = results;
        // console.log(results);
        return results;
      });
    });
    console.log(this.path);
  }
};

// static getColors() {
//   this.colorsDB = JSON.parse(fs.readFileSync("/Users/admin/Desktop/Bachelor/Bachelor/colors.json", "utf8"));
//   // for (i = 0; i < this.colorsDB.length; i++) {
//   //   if (this.colorsDB[i].shade == "yellow") {
//   //     // this.yellowShades.push(yellow[i].rgb.split("/"));
//   //     // this.yellowShades.push(colorsDB[i].shade);
//   //     console.log("hipp hipp hurra");
//   //   }
//   // }
//   // console.log(this.yellowShades);
//   console.log(this.colorsDB.length)
//   return this.colorsDB;
// }
// };
