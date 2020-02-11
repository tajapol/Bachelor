module.exports = class Analyze {
  constructor() {
    this.resultColors = [];
  }

  doAnalyzeColors(dbData) {
    const colorsAna = analyzeColors(dbData);
    this.resultColors.push(colorsAna);
    return this.resultColors;
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

  console.log(formatted);

  const colorResult = "green";
  return colorResult;
};
