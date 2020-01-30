module.exports = class Analyze {
  constructor() {
    this.fonts = String;
    this.colors = String;
    this.result = [];
  }

  doAnalyze(fI) {
    const formattedInput = fI;
    // console.log(formattedInput);

    this.colors = analyzeColor(formattedInput);
    this.fonts = analyzeFont(formattedInput);

    this.result.push(this.colors, this.fonts);

    return this.result;
  }
};

analyzeColor = formattedInput => {
  const anaColor = formattedInput;

  const color = "green";
  return color;
};

analyzeFont = formattedInput => {
  const anaFont = formattedInput;
  console.log(anaFont);
  const font = "Marion";
  return font;
};
