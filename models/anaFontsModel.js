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
  let extractedFonts = [];

  const fontsDB = dbData.fontsDB;
  const seriffDB = dbData.serifDB;
  const sanssSerifDB = dbData.sansSerifDB;
  const monospaceDB = dbData.monospaceDB;
  const fantasyDB = dbData.fantasyDB;

  //extract all font-families and store it in an array
  let extracted = Object.values(formatted.match(/font-family:+(["'`a-zA-Z- ])*/g));
  // let extractedFonts = extractFonts();

  console.log(extractedFonts);
  // }

  //Webtypografie s84
  // rule 1: 1-2 font types are enough
  // if (searchDoubleFonts(extractedFonts) > 2) {
  //   fontAna.push("You use more than 2 different fonts. In most cases this is not necessary.");
  // }

  //Webtypografie S84
  // serifen Schrift mit serfienfreier Schrift kombinieren

  return fontAna;
};

searchDoubleFonts = eF => {
  let fonts = [];
  for (i = 0; i < extracted.length; i++) {
    extractedFonts.push[
      extracted[i]
        .replace("font-family: ", "")
        .replace('"', "")
        .replace('"', "")
    ];
    return fonts;
  }
};

searchDoubleFonts = eF => {
  let duplos = 0;
  for (var i = 0; i < eF.length; i++) {
    for (var j = i + 1; j < eF.length; j++) {
      if (eF[i] != eF[j]) {
        duplos++;
      }
    }
    return duplos;
  }
};
