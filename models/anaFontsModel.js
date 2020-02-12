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
  let count = 0;

  const fontsDB = dbData.fontsDB;
  const seriffDB = dbData.serifDB;
  const sanssSerifDB = dbData.sansSerifDB;
  const monospaceDB = dbData.monospaceDB;
  const fantasyDB = dbData.fantasyDB;

  //extract all font-families and store it in an array
  let extractedFontFamilies = Object.values(formatted.match(/font-family: +(["a-zA-Z-])*/g));
  //search for duplicate
  let duplicate = searchDuplicate(extractedFontFamilies);
  console.log(duplicate);

  //Webtypografie s84
  // rule 1: 1-2 font types are enough
  if (searchDuplicate(extractedFontFamilies) > 2) {
    fontAna.push("You use more than 2 different fonts. In most cases this is not necessary.");
  }

  //Webtypografie S84
  // serifen Schrift mit serfienfreier Schrift kombinieren

  return fontAna;
};

// for (var i = 0; i <= extractedFontFamilies.length; i++) {}

// var extractedFontFamilies = [1, 1, 1, 1];

// const check = arr => extractedFontFamilies.every(v => v == extractedFontFamilies[0]);
// console.log(check());

// var result = Object.keys(obj).map(function(key) {
//   return [Number(key), obj[key]];
// });

searchDuplicate = eFF => {
  let duplos = 0;
  for (var i = 0; i < eFF.length; i++) {
    for (var j = i + 1; j < eFF.length; j++) {
      if (eFF[i] != eFF[j]) {
        duplo++;
      }
    }
    return duplos;
  }
};
