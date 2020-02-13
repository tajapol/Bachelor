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
  // let extractedFonts = [];

  const fontsDB = dbData.fontsDB;
  const seriffDB = dbData.serifDB;
  const sanssSerifDB = dbData.sansSerifDB;
  const monospaceDB = dbData.monospaceDB;
  const fantasyDB = dbData.fantasyDB;

  //extract all font-families and store it in an array
  let extracted = Object.values(formatted.match(/font-family:+(["'`a-zA-Z- ])*/g));
  let extractedFontNames = extractFonts(extracted);

  //Webtypografie s84
  // rule 1: 1-2 font types are enough
  if (uniqueFonts(extractedFontNames).length > 2) {
    fontAna.push("You use more than 2 different fonts. In most cases this is not necessary.");
  }

  //Webtypografie S84
  // serifen Schrift mit serfienfreier Schrift kombinieren

  return fontAna;
};

extractFontNames = e => {
  let fontnames = [];
  for (i = 0; i < e.length; i++) {
    const cutFF = e[i].slice(13);
    fontnames.push(cutFF.replace(/"/g, ""));
  }
  return fontnames;
};

uniqueFonts = ef => {
  return ef.filter(function(value, index, self) {
    return ef.indexOf(value) === index;
  });
};
