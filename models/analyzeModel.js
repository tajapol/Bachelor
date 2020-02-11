const Colors = require("./colorsModel");
const c = new Colors();
const fs = require("fs");

module.exports = class Analyze {
  constructor() {
    this.result = [];
  }

  doAnalyze(dbData) {
    const colorsAna = analyzeColors(dbData);
    const fontsAna = analyzeFonts(dbData);
    this.result.push(colorsAna, fontsAna);
    return this.result;
  }
};

analyzeColors = dbData => {
  const formatted = dbData.formatted;
  const allColors = dbData.colorsDB;
  const yellowDB = dbData.yellowDB;
  const blueDB = dbData.blueDB;
  const brownDB = dbData.brownDB;
  const grayDB = dbData.grayDB;
  const greenDB = dbData.greenDB;
  const orangeDB = dbData.orangeDB;
  const redDB = dbData.redDB;
  const violettDB = dbData.violettDB;
  const whiteDB = dbData.whiteDB;

  const colorResult = "green";
  return colorResult;
};

analyzeFonts = dbData => {
  const fontsDB = dbData.fontsDB;
  const seriffDB = dbData.serifDB;
  const sanssSerifDB = dbData.sansSerifDB;
  const monospaceDB = dbData.monospaceDB;
  const fantasyDB = dbData.fantasyDB;

  console.log(fantasyDB);
  const font = "Marion";
  return font;
};
