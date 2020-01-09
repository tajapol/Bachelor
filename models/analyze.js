const fs = require("fs");
const path = require("path");
// const prettyCSS = require("PrettyCSS");

const p = path.join(path.dirname(process.mainModule.filename), "data", "inputs.css");

module.exports = class Ana {
  constructor(i) {
    this.input = i;
  }

  analyze() {
    postcss([
      require("postcss-import")({
        plugins: [
          require("stylelint")({
            /* your options */
          })
        ]
      }),
      require("postcss-cssnext"),
      require("postcss-reporter")({ clearReportedMessages: true })
    ])
      .process(css, { from: p, to: "app.css" })
      .then(function(result) {
        fs.writeFileSync("app.css", result.css);
        if (result.map) fs.writeFileSync("app.css.map", result.map);
      })
      .catch(err => console.error(err.stack));
  }

  static fetchAll(callB) {
    getInputFromFile(callB);
  }
};

var postcss = require("postcss");
var stylelint = require("stylelint");

// CSS to be processed
var css = fs.readFileSync(p, "utf8");