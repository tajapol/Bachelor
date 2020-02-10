const Colors = require("./colorsModel");
const c = new Colors();
const fs = require("fs");

module.exports = class Analyze {
  constructor() {
    this.colorsDB = [];
    this.fonts = String;
    this.colorsAna = String;
    this.result = [];
  }

  doAnalyze(f, c) {
    this.colorsDB = c;

    const file = f;
    console.log(this.colorsDB);

    this.colorsAna = analyzeColor(this.colorsDB);
    this.fonts = analyzeFont();
    this.result.push(this.colorsAna, this.fonts);

    return this.result;
  }
};

analyzeColor = (f, c) => {
  // const colorDb = c;
  // const formatted = f;
  // const yellowShades = [];
  // for (i = 0; i < colorDb.length - 1; i++) {
  //   if (colorDb[i].shade == "yellow") {
  //     yellowShades.push(colorDb[i]);
  //   }
  // }

  // console.log(yellowShades);
  const color = "green";
  return color;
};

analyzeFont = () => {
  const font = "Marion";
  return font;
};

// console.log(colors);
// for (i = 0; i < colors.length - 1; i++) {
// console.log(colors[i].shade);
//   //   if (this.colorsDB[i].shade == "yellow") {
//   //     // this.yellowShades.push(yellow[i].rgb.split("/"));
//   //     // this.yellowShades.push(colorsDB[i].shade);
//   //     console.log("hipp hipp hurra");
//   //   }
// }
// this.colorsDB = c.getColors();s
// this.yellowShades = Colors.yellowShades;

// .then(y => {
//   colorsDB = y;
//   // return y;
// })
// .catch(err => {
//   console.log(err);
// });

// console.log(this.colorsDB[112].shade);
