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

  let allFontNamesDb = fontNamesDB(fontsDB);
  let extractedInput = Object.values(formatted.match(/font-family:+(["'`a-zA-Z- ])*/g));
  let inputFontNames = extractNames(extractedInput);
  let usedFonts = uniqueFonts(inputFontNames);

  //rule 1: use websafe fonts
  // websafeTest 1 checks if fonts are in  db, if not fonts are def not websafe
  // websafeTest2: if some fonts are in db, some not, websafe2 stores the fonts which are not
  //in the db and so def not websafe
  //but there are some fonts which are in the db and not safe, so we test more
  const webSafeTest1 = usedFonts.filter(element => allFontNamesDb.includes(element));
  const webSafeTest2 = usedFonts.filter(element => !webSafeTest1.includes(element));

  if (webSafeTest1.length == 0) {
    usedFonts.length == 1
      ? fontAna.push("Attention! " + usedFonts + " is not websafe.")
      : fontAna.push("Attention! " + usedFonts + " are not websafe.");
  } else {
    webSafeTest2.length == 1
      ? fontAna.push("Attention! " + webSafeTest2 + " is not websafe.")
      : fontAna.push("Attention! " + webSafeTest2 + " are not websafe.");
    for (fontDb of fontsDB) {
      for (usedFont of usedFonts) {
        if (usedFont == fontDb.name && fontDb.websafe == false) {
          fontAna.push("Attention! " + usedFont + " is not websafe.");
        }
      }
    }
  }

  //Webtypografie s84
  // rule 2: 1-2 font types are enough
  if (usedFonts.length > 2) {
    fontAna.push("You use more than 2 different fonts. In most cases this is not necessary.");
  }

  //Webtypografie S84
  // serifen Schrift mit serfienfreier Schrift kombinieren
  // console.log(intersection);

  return fontAna;
};

fontNamesDB = dbFonts => {
  let allFontNamesDb = [];
  for (let dbFont of dbFonts) {
    allFontNamesDb.push(dbFont.name);
  }
  return allFontNamesDb;
};

extractNames = ee => {
  let fontnames = [];
  for (let e of ee) {
    const cutFF = e.slice(13);
    fontnames.push(cutFF.replace(/"/g, ""));
  }
  return fontnames;
};

uniqueFonts = ef => {
  return ef.filter(function(value, index, self) {
    return ef.indexOf(value) === index;
  });
};
