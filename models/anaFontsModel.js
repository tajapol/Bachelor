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
  const notFormatted = dbData.notFormatted;
  const choosenFormat = dbData.choosenFormat;

  let fontAna = [];

  const fontsDB = dbData.fontsDB;
  const allFontNamesDb = fontNamesDB(fontsDB);

  const extractedInputFonts = proofNotNULL(formatted.match(/font-family:+(["'`a-zA-Z- ])*/g));
  const extractedInputHeadingFS = proofNotNULL(extractHeadingFontsizes(notFormatted));

  const inputFontNames = extractInputNames(extractedInputFonts);
  const usedFonts = unique(inputFontNames);
  const usedHeadingSizes = proofNotNULL(parseToInt(extractedInputHeadingFS));

  const existsInDB = usedFonts.filter(element => allFontNamesDb.includes(element));
  const notWebsafeDB = usedFonts.filter(element => !existsInDB.includes(element));

  const inputFontFamily = extractFontFamily(existsInDB, fontsDB);
  const usedFontFamily = unique(inputFontFamily);

  console.log(usedHeadingSizes);

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
      case usedFontFamily.length == 1 && existsInDB.length > 1:
        fontAna.push(
          "You use more than 1 font ( " +
            existsInDB.filter(item => item !== usedFonts) +
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

  //Webtypografie S93
  //////////////////////////////////// rule 4: use responsive font-sizes//////////////////////////////////

  // /////////////// https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
  //////////////////////////////////// rule 4: font-sizes //////////////////////////////////
  if (extractedInputFonts.length == 0 && extractedInputH.length == 0) {
    fontAna.push("You didn't use any fonts, that's why we can't analyze something.");
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

extractHeadingFontsizes = nf => {
  let headingFS = [];
  const headings = nf.match(/h+([0-9a])* {+[\r\n ]+([a-zA-Z -:0-9.;\r\n])*}+/g);
  for (let h of headings) {
    let fontSize = h.match(/font-size: +([0-9a-zA-Z.])*/g);
    for (let f of fontSize) {
      headingFS.push(f.replace("font-size: ", ""));
    }
  }
  return headingFS;
};

parseToInt = eHFZs => {
  let parsedUnits = [];
  for (let h of eHFZs) {
    if (h.match("px")) {
      const cut = parseFloat(h.replace("px", ""));
      parsedUnits.push(cut * 0.06);
    }
    if (h.match("rem")) {
      const cut = parseFloat(h.replace("rem", ""));
      parsedUnits.push(cut);
    }
  }
  return parsedUnits;
};

unique = many => {
  return many.filter(function(value, index, self) {
    return many.indexOf(value) === index;
  });
};

proofNotNULL = check => {
  let saveRGB = [];
  check ? (saveRGB = check) : (saveRGB = []);
  return saveRGB;
};
