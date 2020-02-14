// websafeTest 1 checks if fonts exist in db, if not, fonts are def not websafe
// websafeTest2: if some fonts do exist in db, some not, websafe2 stores the fonts which are not
//in the db and so def not websafe
//but there are some fonts which are in the db and not safe, so we test more

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
  const allFontNamesDb = fontNamesDB(fontsDB);

  const extractedInput = Object.values(formatted.match(/font-family:+(["'`a-zA-Z- ])*/g));
  const inputFontNames = extractInputNames(extractedInput);
  const usedFonts = uniqueFonts(inputFontNames);

  const webSafeTest1 = usedFonts.filter(element => allFontNamesDb.includes(element));
  const webSafeTest2 = usedFonts.filter(element => !webSafeTest1.includes(element));

  const inputFontFamily = extractFontFamily(webSafeTest1, fontsDB);
  const usedFontFamily = uniqueFontFamily(inputFontFamily);

  //Webtypografie S84
  //////////////////////////////////// rule 1: 1-2 font types are enough//////////////////////////////////
  if (usedFonts.length > 2) {
    fontAna.push("You use more than 2 different fonts. In most cases this is not necessary.");
  }

  //////////////////////////////////rule 2: use websafe fonts//////////////////////////////////
  if (webSafeTest1.length == 0) {
    usedFonts.length == 1 ? fontAna.push(usedFonts + " is not websafe.") : fontAna.push(usedFonts + " are not websafe.");
  } else {
    for (fontDb of fontsDB) {
      for (usedFont of usedFonts) {
        if (usedFont == fontDb.name && fontDb.websafe == false) {
          fontAna.push(usedFont + " is not websafe.");
        }
      }
    }
  }
  console.log(!usedFontFamily.includes("serif"));
  console.log(usedFontFamily);

  //Webtypografie s84
  //////////////////////////////////// rule 3:combinate serif with sans-sarif //////////////////////////////////
  if (usedFonts.length > 1 && usedFontFamily.length > 1) {
    if (webSafeTest2.length == 1) {
      fontAna.push(
        webSafeTest2 +
          " is not websafe. You should only combine a serif font with a sans-serif font. If you want to use them anyway, you should check that out."
      );
    }
    if (webSafeTest2.length > 1) {
      fontAna.push(
        webSafeTest2 +
          " are not websafe. You should only combine a serif font with a sans-serif font. If you want to use them anyway, you should check that out."
      );
    }

    if (
      (!usedFontFamily.includes("serif") || !usedFontFamily.includes("sans-serif")) &&
      (usedFontFamily.includes("serif") ||
        usedFontFamily.includes("sans-serif") ||
        usedFontFamily.includes("monospace") ||
        usedFontFamily.includes("fantasy") ||
        usedFontFamily.includes("cursiv"))
    ) {
      fontAna.push("You use " + usedFontFamily + " You should combine a serif font with a sans-serif font.");
    }
    if (
      usedFontFamily.includes("serif") &&
      usedFontFamily.includes("sans-serif") &&
      (usedFontFamily.includes("sans-serif") ||
        usedFontFamily.includes("monospace") ||
        usedFontFamily.includes("fantasy") ||
        usedFontFamily.includes("cursiv"))
    ) {
      fontAna.push(webSafeTest2 + "You use too many different font-families.");
    }
  }
  if (usedFonts.length > 1 && usedFontFamily.length == 1) {
    fontAna.push(webSafeTest2 + "You use more than 1 font, but all have the same font-family. You may should use two different font-families.");
  }

  return fontAna;
};

fontNamesDB = fDb => {
  let allFontNamesDb = [];
  for (let fontDb of fDb) {
    allFontNamesDb.push(fontDb.name);
  }
  return allFontNamesDb;
};

extractInputNames = eI => {
  let fontnames = [];
  for (let e of eI) {
    const cutFF = e.slice(13);
    fontnames.push(cutFF.replace(/"/g, ""));
  }
  return fontnames;
};

extractFontFamily = (wst, fDb) => {
  let inputFontFamily = [];
  for (fontDb of fDb) {
    for (websafe of wst) {
      if (websafe == fontDb.name) {
        inputFontFamily.push(fontDb.fontfamily);
      }
    }
  }
  return inputFontFamily;
};

uniqueFonts = ef => {
  return ef.filter(function(value, index, self) {
    return ef.indexOf(value) === index;
  });
};

uniqueFontFamily = eff => {
  return eff.filter(function(value, index, self) {
    return eff.indexOf(value) === index;
  });
};
