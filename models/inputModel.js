const fs = require("fs");
const path = require("path");
const getDb = require("../util/database").getDb;

//path input
const p = path.join(path.dirname(process.mainModule.filename), "data", "input.css");
//path formatedInput
const p2 = path.join(path.dirname(process.mainModule.filename), "data", "formatedInput.css");

module.exports = class Input {
  constructor(i) {
    this.directInput = i;
    this.id = Math.random().toString();
  }

  save() {
    const db = getDb();
    return db
      .collection("inputs")
      .insertOne(this)
      .then(inputs => {
        const ini = this.getDataFromDB();
        // console.log(ini);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getDataFromDB() {
    const db = getDb();
    return db
      .collection("inputs")
      .find()
      .toArray()
      .then(dI => {
        console.log("hiiihi");
        // console.log(dI[0].directInput);
        return dI;
      })
      .catch(err => {
        console.log(err);
      });
  }

  // static formatInput() {
  //   return db
  //     .collection("inputs")
  //     .findOne({
  //       id: Input.id
  //     })
  //     .then(inputs => {
  //       // const input = this.result;
  //       console.log(inputs);
  //       return inputs;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  // formatInput() {
  //   var postcss = require("postcss");
  //   var stylelint = require("stylelint");

  //   // CSS to be processed
  //   var css = fs.readFileSync(p, "utf8");
  //   postcss([
  //     require("postcss-import")({
  //       plugins: [
  //         require("stylelint")({
  //           /* your options */
  //         })
  //       ]
  //     }),
  //     require("postcss-cssnext"),
  //     require("postcss-reporter")({ clearReportedMessages: true })
  //   ])
  //     .process(css, { from: p, to: p2 })
  //     .then(function(result) {
  //       fs.writeFileSync(p2, result.css);
  //       if (result.map) fs.writeFileSync(p2.map, result.map);
  //     })
  //     .catch(err => console.error(err.stack));
  // }
};
