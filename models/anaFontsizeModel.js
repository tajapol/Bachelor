module.exports = class Analyze {
  constructor() {
    this.resultFonts = [];
  }

  doAnalyzeFontsize(dbData) {
    const fontsAna = analyzeFontsize(dbData);
    this.resultFonts.push(fontsAna);
    return this.resultFonts;
  }
};

analyzeFontsize = dbData => {
  const notFormatted = dbData.notFormatted;
  const choosenFormat = dbData.choosenFormat;

  let fontsizeAna = [];

  const extractedInputHeadingFS = proofNotNULL(extractHeadingFontsizes(notFormatted));

  const usedHeadingSizes = proofNotNULL(parseToFloat(extractedInputHeadingFS));
  const sorted = isSorted(usedHeadingSizes.parsedUnits);

  //Webtypografie S93
  ////////////////////////////////////  ///rule 4: don't mix rem and px//////////////////////////////////
  //////////////////////////////////// rule 5: use responsive font-sizes//////////////////////////////////

  switch (true) {
    case usedHeadingSizes.pixel == true && usedHeadingSizes.rem == false:
      fontsizeAna.push(" You just pixel as a size unit. In most cases, you should use relative rather than absolute units.");
      break;

    case usedHeadingSizes.pixel == true && usedHeadingSizes.rem == true:
      fontsizeAna.push(" You mixed size units. In most cases, you should use relative rather than absolute units. ");
      break;

    default:
      console.log("Size units are fine.");
      break;
  }

  //////////////////////////////////// rule 6:sorted chronologically according to size//////////////////////////////////

  if (sorted == false) {
    fontsizeAna.push("Font-sizes should always be sorted chronologically.");
  }

  // /////////////// https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
  //////////////////////////////////// rule 7: font-sizes //////////////////////////////////

  if (extractedInputHeadingFS.length == 0) {
    fontsizeAna.push("You didn't use any font-sizes, that's why we can't analyze something.");
  }

  return fontsizeAna;
};

extractHeadingFontsizes = nf => {
  let headingFS = [];
  const headings = proofNotNULL(nf.match(/h+([0-9a])* {+[\r\n ]+([a-zA-Z -:0-9.;\r\n])*}+/g));
  for (let h of headings) {
    let fontSize = proofNotNULL(h.match(/font-size: +([0-9a-zA-Z.])*/g));
    for (let f of fontSize) {
      headingFS.push(f.replace("font-size: ", ""));
    }
  }
  return headingFS;
};

parseToFloat = eHFZs => {
  let pU = [];
  let px = false;
  let r = false;
  for (let h of eHFZs) {
    if (h.match("px")) {
      const cut = parseFloat(h.replace("px", ""));
      px = true;
      pU.push(cut * 0.06);
    }
    if (h.match("rem")) {
      const cut = parseFloat(h.replace("rem", ""));
      r = true;
      pU.push(cut);
    }
  }
  let allFSresults = {
    parsedUnits: pU,
    pixel: px,
    rem: r
  };
  return allFSresults;
};

isSorted = uHS => {
  let sorted = Boolean;
  for (let i = 0; i < uHS.length - 1; i++) {
    if (uHS[i] < uHS[i + 1]) {
      return false;
    }
  }
  return true;
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
