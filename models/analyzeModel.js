module.exports = class Analyze {
  constructor(fc) {
    this.formattedContent = fc;
    // this.result = String;
  }

  getResult() {
    const result = "huhu";
    return result;
  }

  doAnalyze(fc) {
    getAna(fc);
  }
};

getAna = fc => {
  console.log(fc);
};
