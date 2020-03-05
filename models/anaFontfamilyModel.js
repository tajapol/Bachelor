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
  const formated = dbData.formated;

  let fontfamilyAna = [];

  const fontsDB = dbData.fontsDB;
  const allFontNamesDb = fontNamesDB(fontsDB);

  const extractedInputFonts = proofNotNULL(formated.match(/font-family:+(["'`a-zA-Z- ])*/g));

  const inputFontNames = extractInputNames(extractedInputFonts);
  const usedFonts = unique(inputFontNames);

  const existsInDB = usedFonts.filter(element => allFontNamesDb.includes(element));
  const notWebsafeDB = usedFonts.filter(element => !existsInDB.includes(element));

  const inputFontFamily = extractFontFamily(existsInDB, fontsDB);
  const usedFontFamily = unique(inputFontFamily);

  //Webtypografie S84
  //////////////////////////////////// rule 1: 1-2 font types are enough//////////////////////////////////

  if (usedFonts.length > 2) {
    fontfamilyAna.push("You use more than 2 different fonts. In most cases this is not necessary.");
  }

  if (usedFontFamily.length > 2) {
    fontfamilyAna.push("You use too many different font-families. (" + usedFontFamily + ")");
  }

  //////////////////////////////////rule 2: use websafe fonts//////////////////////////////////
  if (existsInDB.length == 0) {
    if (usedFonts.length == 1) {
      fontfamilyAna.push(usedFonts + " is not websafe.");
    }
    if (usedFonts.length > 1) {
      fontfamilyAna.push(usedFonts + " are not websafe.");
    }
  } else {
    for (fontDb of fontsDB) {
      for (usedFont of usedFonts) {
        if (usedFont == fontDb.name && fontDb.websafe == false) {
          fontfamilyAna.push(usedFont + " is not websafe.");
        }
      }
    }
  }

  if (usedFonts.length > 1) {
    if (notWebsafeDB.length == 1) {
      fontfamilyAna.push(
        notWebsafeDB +
          " is not websafe and not in our database. You should only combine a serif font with a sans-serif font. If you want to use them anyway, you should check that out."
      );
    }

    if (notWebsafeDB.length > 1) {
      fontfamilyAna.push(
        notWebsafeDB +
          " are not websafe and not in our database. You should only combine a serif font with a sans-serif font. If you want to use them anyway, you should check that out."
      );
    }
  }

  //Webtypografie s84
  //////////////////////////////////// rule 3:combinate serif with sans-sarif //////////////////////////////////
  if (usedFonts.length > 1) {
    if (usedFontFamily.length == 1) {
      fontfamilyAna.push(
        "You use more than 1 font ( " +
          existsInDB.filter(item => item !== usedFonts) +
          " ), but all have the same font-family.  ( " +
          usedFontFamily +
          " ) You may should use two different font-families."
      );
    }

    if (usedFontFamily.length > 1) {
      if (usedFontFamily.includes("serif") && !usedFontFamily.includes("sans-serif")) {
        fontfamilyAna.push(" You combine serif with " + usedFontFamily.filter(item => item !== "serif") + " ,but a sans-serif could be better.");
      }
      if (!usedFontFamily.includes("serif") && usedFontFamily.includes("sans-serif")) {
        fontfamilyAna.push(" You combine sans-serif with " + usedFontFamily.filter(item => item !== "sans-serif") + " ,but a serif could be better.");
      }
    }
  }

  if (extractedInputFonts.length == 0) {
    fontfamilyAna.push("You didn't use any fonts, that's why we can't analyze something.");
  }

  return fontfamilyAna;
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
