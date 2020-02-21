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
  let fontsizeAnaDesktop = [];
  let fontsizeAnaMobile = [];

  const extractMeadiaQuery = notFormatted.match(/@media+([a-zA-Z0-9 -:(){}\r\n;])*/g);
  const extractedMediaQueryTypes = mediaqueryType(proofNotNULL(extractMeadiaQuery));

  const extractedHeadingFSDesktop = proofNotNULL(extractHeadingFontsizes(notFormatted.replace(proofNotNULL(extractMeadiaQuery), "")));
  const usedHeadingSizesDesktop = proofNotNULL(parseToFloat(extractedHeadingFSDesktop));
  const usedUnitDesktop = [usedHeadingSizesDesktop.rem, usedHeadingSizesDesktop.pixel];
  const sortedDesktop = isSorted(usedHeadingSizesDesktop.parsedUnits);
  const notReasonableSizesDesktop = checkReasonableSizesDesktop(proofNotNULL(usedHeadingSizesDesktop.parsedUnits));

  const extractedHeadingFSMobile = proofNotNULL(extractHeadingFontsizes(proofStringNotNull(extractedMediaQueryTypes[0])));
  const usedHeadingSizesMobile = proofNotNULL(parseToFloat(extractedHeadingFSMobile));
  const usedUnitMobile = [usedHeadingSizesMobile.rem, usedHeadingSizesMobile.pixel];
  const sortedMobile = isSorted(usedHeadingSizesMobile.parsedUnits);
  const notReasonableSizesMobile = checkReasonableSizesDesktop(proofNotNULL(usedHeadingSizesMobile.parsedUnits));

  switch (true) {
    case extractedHeadingFSDesktop.length == 0:
      fontsizeAna.push("You didn't use any font-sizes, that's why we can't analyze something.");
      break;

    //Webtypografie S93
    ////////////////////////////////////  ///rule 1: don't mix rem and px//////////////////////////////////
    //////////////////////////////////// rule 2: use responsive font-sizes//////////////////////////////////

    case usedUnitDesktop[1] == true:
      usedUnitDesktop[0] == false
        ? fontsizeAnaDesktop.push(" You just use pixel as a size unit. In most cases, you should use relative rather than absolute units.")
        : fontsizeAnaDesktop.push(" You mixed size units. In most cases, you should use relative rather than absolute units. ");

    case usedUnitMobile[1] == true:
      usedUnitMobile[0] == false
        ? fontsizeAnaMobile.push(
            " You just use pixel as a size in your mobile media queries. In most cases, you should use relative rather than absolute units."
          )
        : fontsizeAnaMobile.push(
            " You mixed size units in your mobile media queries. In most cases, you should use relative rather than absolute units. "
          );

    //////////////////////////////////// rule 3:sorted chronologically according to size//////////////////////////////////

    case sortedDesktop == false:
      fontsizeAnaDesktop.push("Font-sizes should always be sorted chronologically.");

    case sortedMobile == false:
      fontsizeAnaMobile.push("Font-sizes should always be sorted chronologically in the mediaqueries as well.");

    /////////////////////      https://www.mediaevent.de/css/font-size.html //////////////////////
    //////////////////////////////////// rule 4: reasonable font-sizes //////////////////////////////////

    case notReasonableSizesDesktop.length > 0:
      for (let i = 0; i < notReasonableSizesDesktop.length; i++) {
        if (notReasonableSizesDesktop[i] === false) {
          const nr = i + 1;
          fontsizeAnaDesktop.push(
            "Your " + nr + ". heading font-size:" + extractedHeadingFSDesktop[i] + " is too large. Maybe you should revise that."
          );
        }
      }
    case otReasonableSizesMobile.length > 0:
      for (let i = 0; i < notReasonableSizesDesktop.length; i++) {
        if (notReasonableSizesMobile[i] === false) {
          const nr = i + 1;
          fontsizeAnaMobile.push(
            "In your mediaqueries your " + nr + ". heading font-size:" + extractedHeadingFSMobile[i] + " is too large. Maybe you should revise that."
          );
        }
      }

      switch (true) {
        case choosenFormat == "mobile":
          fontsizeAna = fontsizeAnaMobile;
          break;

        case choosenFormat == "desktop":
          fontsizeAna = fontsizeAnaDesktop;
          break;

        case choosenFormat == "both":
          fontsizeAna = fontsizeAnaDesktop.concat(fontsizeAnaMobile);
          break;

        case choosenFormat == "placeholder":
          fontsizeAnaDesktop.push("You didn't choose a format. Desktop is our default format.");
          fontsizeAna = fontsizeAnaDesktop;
          break;
      }

      return fontsizeAna;
  }
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
    if (h.match(/px+/g)) {
      const cut = parseFloat(h.replace(/px+/g, ""));
      px = true;
      pU.push(cut * 0.06);
    }
    if (h.match(/r*em+/g)) {
      const cut = parseFloat(h.replace(/r*em+/g, ""));
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
  for (let i = 0; i < uHS.length - 1; i++) {
    if (uHS[i] < uHS[i + 1]) {
      return false;
    }
  }
  return true;
};

checkReasonableSizesDesktop = uHS => {
  const goodSizes = [2, 1.5, 1.17, 1, 0.83, 0.67];
  const badSizes = [];

  for (let i = 0; i < uHS.length; i++) {
    uHS[i] > goodSizes[i] ? badSizes.push(false) : badSizes.push(true);
  }
  return badSizes;
};

checkReasonableSizesMobile = uHS => {
  const goodSizes = [1.7, 1.2, 0.97, 0.7, 0.53, 0.37];
  const badSizes = [];

  for (let i = 0; i < uHS.length; i++) {
    uHS[i] > goodSizes[i] ? badSizes.push(false) : badSizes.push(true);
  }
  return badSizes;
};

mediaqueryType = emqs => {
  let intOnly = [];
  let mediaOnly = [];
  let mobile = [];

  for (let i = 0; i < emqs.length; i++) {
    mediaOnly = emqs[i].match(/@media screen+([a-zA-Z0-9 -:()])*{+/g);
    for (let i = 0; i < mediaOnly.length; i++) {
      intOnly.push(parseInt(mediaOnly[i].replace("px) {", "").slice(30)));
      if (intOnly <= 640) {
        mobile.push(emqs[i]);
      }
    }
  }
  return mobile;
};

proofNotNULL = check => {
  let toProof = [];
  check ? (toProof = check) : (toProof = []);
  return toProof;
};

proofStringNotNull = check => {
  let toProof = String;
  check ? (toProof = check) : (toProof = "Placeholder");
  return toProof;
};
