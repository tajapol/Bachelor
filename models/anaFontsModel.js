module.exports = class Analyze {
  constructor() {
    this.resultFonts = [];
  }

  doAnalyzeFonts(dbData) {
    const fontsAna = analyzeFonts(dbData);
    this.resultFonts.push(fontsAna);
    return this.resultFonts;
  }
};

analyzeFonts = dbData => {
  let formatted = dbData.formatted;
  let fontAna = [];

  const fontsDB = dbData.fontsDB;
  const seriffDB = dbData.serifDB;
  const sanssSerifDB = dbData.sansSerifDB;
  const monospaceDB = dbData.monospaceDB;
  const fantasyDB = dbData.fantasyDB;

  //Webtypografie s84
  // rule 1: 1-2 font types are enough
  let extracted = formatted.match(/font-family: +(["a-zA-Z-])*/g);
  // let count = extracted.length;

  if (extracted.length > 2) {
    fontAna.push("You use more than 2 different fonts. In most cases this is not necessary.");
  }

  //Webtypografie S84
  // serifen Schrift mit serfienfreier Schrift kombinieren

  return fontAna;
};

// if (str.match("^\"")) {
//   // do this if begins with Hello
// }

// if (str.match("World$")) {
//   // do this if ends in world
// }
