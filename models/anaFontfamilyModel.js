module.exports = class Analyze {
  constructor() {
    this.resultFonts = [];
  }

  doAnalyzeFontfamily(dbData) {
    const fontsAna = analyzeFontfamily(dbData);
    this.resultFonts.push(fontsAna);
    return this.resultFonts;
  }
};

analyzeFontfamily = dbData => {
  const formatted = dbData.formatted;

  let fontAna = [];

  const fontsDB = dbData.fontsDB;
  const allFontNamesDb = fontNamesDB(fontsDB);

  const extractedInputFonts = proofNotNULL(formatted.match(/font-family:+(["'`a-zA-Z- ])*/g));

  const inputFontNames = extractInputNames(extractedInputFonts);
  const usedFonts = unique(inputFontNames);

  const existsInDB = usedFonts.filter(element => allFontNamesDb.includes(element));
  const notWebsafeDB = usedFonts.filter(element => !existsInDB.includes(element));

  const inputFontFamily = extractFontFamily(existsInDB, fontsDB);
  const usedFontFamily = unique(inputFontFamily);

  switch (true) {
    case extractedInputFonts.length == 0:
      fontAna.push("You didn't use any fonts, that's why we can't analyze something.");
      break;

    //Webtypografie S84
    //////////////////////////////////// rule 1: 1-2 font types are enough//////////////////////////////////
    case usedFonts.length > 2:
      fontAna.push("You use more than 2 different fonts. In most cases this is not necessary.");

    case usedFontFamily.length > 2:
      fontAna.push("You use too many different font-families. (" + usedFontFamily + ")");

    //////////////////////////////////rule 2: use websafe fonts//////////////////////////////////

    case existsInDB.length == 0:
      if (usedFonts.length == 1) {
        fontAna.push(usedFonts + " is not websafe.");
      }
      if (usedFonts.length > 1) {
        fontAna.push(usedFonts + " are not websafe.");
      }

    case existsInDB.length > 0:
      for (fontDb of fontsDB) {
        for (usedFont of usedFonts) {
          if (usedFont == fontDb.name && fontDb.websafe == false) {
            fontAna.push(usedFont + " is not websafe.");
          }
        }
      }

    //Webtypografie s84
    //////////////////////////////////// rule 3:combinate serif with sans-sarif //////////////////////////////////

    case usedFonts.length > 1:
      if (usedFontFamily.length == 1) {
        fontAna.push(
          "You use more than 1 font ( " +
            usedFonts +
            " ), but all have the same font-family.  ( " +
            usedFontFamily +
            " ) You may should use two different font-families."
        );
      }

      if (usedFontFamily.length > 1) {
        switch (true) {
          case usedFontFamily.includes("serif") && !usedFontFamily.includes("sans-serif"):
            fontAna.push(
              notWebsafeDB + " You combine serif with " + usedFontFamily.filter(item => item !== "serif") + " ,but a sans-serif could be better."
            );

          case !usedFontFamily.includes("serif") && usedFontFamily.includes("sans-serif"):
            fontAna.push(
              notWebsafeDB + " You combine sans-serif with " + usedFontFamily.filter(item => item !== "sans-serif") + " ,but a serif could be better."
            );
        }
      }

    case usedFonts.length > 1:
      if (notWebsafeDB.length == 1) {
        fontAna.push(
          notWebsafeDB +
            " is not in our database. You should only combine a serif font with a sans-serif font. If you want to use them anyway, you should check that out."
        );
      }

      if (notWebsafeDB.length > 1) {
        fontAna.push(
          notWebsafeDB +
            " are not in our database. You should only combine a serif font with a sans-serif font. If you want to use them anyway, you should check that out."
        );
      }
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

unique = many => {
  return many.filter(function(value, index, self) {
    return many.indexOf(value) === index;
  });
};

proofNotNULL = check => {
  let toProof = [];
  check ? (toProof = check) : (toProof = []);
  return toProof;
};
