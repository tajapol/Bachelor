const fs = require("fs");
const path = require("path");
const getDb = require("../util/database").getDb;

//path input
const p = path.join(path.dirname(process.mainModule.filename), "data", "input.css");
//path formatedInput
const p2 = path.join(path.dirname(process.mainModule.filename), "data", "formatedInput.css");

module.exports = class Input {
  constructor(directInput) {
    this.directInput = directInput;
    this.id = Math.random().toString();
  }

  save() {
    const db = getDb();
    return db
      .collection("inputs")
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // save() {
  //   fs.writeFile(p, this.directInput, err => {
  //     console.log(err);
  //     // console.log(this.id);
  //     this.formatInput();
  //   });
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
