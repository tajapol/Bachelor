const Colors = require("./colorsModel");
const c = new Colors();
const fs = require("fs");

module.exports = class Analyze {
  constructor() {
    this.result = [];
  }

  doAnalyze(f, c, y, bl, br, gray, gr, o, r, v, w) {
    const colorsAna = analyzeColor(f, c, y, bl, br, gray, gr, o, r, v, w);
    const fontsAna = analyzeFont();
    this.result.push(colorsAna, fontsAna);

    return this.result;
  }
};

analyzeColor = (f, c, y, bl, br, gray, gr, o, r, v, w) => {
  const formatted = f;
  const allColors = c;
  const yellowDB = y;
  const blueDB = bl;
  const brownDB = br;
  const grayDB = gray;
  const greenDB = gr;
  const orangeDB = o;
  const redDB = r;
  const violettDB = v;
  const whiteDB = w;

  console.log(whiteDB);
  const colorResult = "green";
  return colorResult;
};

analyzeFont = () => {
  const font = "Marion";
  return font;
};
