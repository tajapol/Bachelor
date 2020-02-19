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
  const formatted = dbData.formatted;
  const choosenFormat = dbData.choosenFormat;

  let fontAna = [];

  const fontsDB = dbData.fontsDB;
  const allFontNamesDb = fontNamesDB(fontsDB);
  const extractedInput = formatted.match(/font-family:+(["'`a-zA-Z- ])*/g);

  if (extractedInput != undefined) {
    const inputFontNames = extractInputNames(extractedInput);
    const usedFonts = unique(inputFontNames);

    const existsInDB = usedFonts.filter(element => allFontNamesDb.includes(element));
    const notWebsafeDB = usedFonts.filter(element => !existsInDB.includes(element));

    const inputFontFamily = extractFontFamily(existsInDB, fontsDB);
    const usedFontFamily = unique(inputFontFamily);

    //Webtypografie S84
    //////////////////////////////////// rule 1: 1-2 font types are enough//////////////////////////////////
    if (usedFonts.length > 2) {
      fontAna.push("You use more than 2 different fonts. In most cases this is not necessary.");
    }

    if (usedFontFamily.length > 2) {
      fontAna.push("You use too many different font-families. (" + usedFontFamily + ")");
    }

    //////////////////////////////////rule 2: use websafe fonts//////////////////////////////////
    if (existsInDB.length == 0) {
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

    //Webtypografie s84
    //////////////////////////////////// rule 3:combinate serif with sans-sarif //////////////////////////////////
    if (usedFonts.length > 1) {
      switch (true) {
        case usedFontFamily.length == 1:
          fontAna.push(
            "You use more than 1 font ( " +
              usedFonts +
              " ), but all have the same font-family.  ( " +
              usedFontFamily +
              " ) You may should use two different font-families."
          );
          break;

        case usedFontFamily.length > 1:
          if (usedFontFamily.includes("serif") && !usedFontFamily.includes("sans-serif")) {
            fontAna.push(
              notWebsafeDB + " You combine serif with " + usedFontFamily.filter(item => item !== "serif") + " ,but a sans-serif could be better."
            );
          }
          if (!usedFontFamily.includes("serif") && usedFontFamily.includes("sans-serif")) {
            fontAna.push(
              notWebsafeDB + " You combine sans-serif with " + usedFontFamily.filter(item => item !== "sans-serif") + " ,but a serif could be better."
            );
          }

        default:
          console.log("Fontfamilies are fine");
          break;
      }
    }

    if (usedFonts.length > 1) {
      switch (true) {
        case notWebsafeDB.length == 1:
          fontAna.push(
            notWebsafeDB +
              " is not in our database. You should only combine a serif font with a sans-serif font. If you want to use them anyway, you should check that out."
          );
          break;

        case notWebsafeDB.length > 1:
          fontAna.push(
            notWebsafeDB +
              " are not in our database. You should only combine a serif font with a sans-serif font. If you want to use them anyway, you should check that out."
          );
          break;

        default:
          console.log("All used fonts exist in the DB");
          break;
      }
    }

    //////////////////////////////////// rule 4: font-sizes //////////////////////////////////
    return fontAna;
  } else {
    fontAna.push("You didn't use any fonts, that's why we can't analyze something.");
    return fontAna;
  }
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

unique = many => {
  return many.filter(function(value, index, self) {
    return many.indexOf(value) === index;
  });
};
