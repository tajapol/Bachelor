module.exports = class Analyze {
  constructor() {
    this.resultColors = [];
  }

  doAnalyzeColors(dbData) {
    const colorsAna = analyzeColors(dbData);
    this.resultColors.push(colorsAna);
    return this.resultColors;
  }
};

analyzeColors = dbData => {
  const formatted = dbData.formatted;
  let colorAna = [];

  const allColors = dbData.colorsDB;
  const checkColorUsed = formatted.match(/color: +([a-zA-Z])*/g);
  let extracedInputRGB = proofNotNULL(formatted.match(/rgb+([a(0-9, ])*/g));
  let extractedInputHEX = proofNotNULL(formatted.match(/#+([0-9a-zA-Z])*/g));

  const usedRGB = unique(extractInputRGB(extracedInputRGB));
  const usedHEX = unique(extractedInputHEX);
  const usedColors = usedHEX.concat(usedRGB);

  const badColors = unique(filterBadColors(formatted));
  const usedShades = extractInputShades(allColors, usedColors);

  //////////////////////////////////// rule 1 only use rgb, rgba, hex //////////////////////////////////
  if (badColors.length >= 1) {
    colorAna.push("You use " + badColors + " instead of rgb or hex colors. You should change that.");
  }

  // ///////////////////https://birgithotz.com/website-farbkonzept////////////////////////////////
  //////////////////////////////////// rule 2: max 2 colors (except black, white, gray) //////////////////////////////////

  if (usedShades.length > 2) {
    colorAna.push("You use more than 2 primarycolors. In most cases this is too much.");
  }

  if (extracedInputRGB.length == 0 && extractedInputHEX.length == 0 && checkColorUsed == null) {
    colorAna.push("You didn't use any colors, that's why we can't analyze something.");
  }
  return colorAna;
};

// ///////////////////   Grundkurs gutes Webdesign S.333 ///////////////////////////////
//////////////////////////////////// rule 3: contrast //////////////////////////////////

extractInputRGB = eRGB => {
  let rgb = [];
  for (let e of eRGB) {
    if (e.includes("rgba")) {
      let cut = e.slice(0, e.length - 2);
      if (cut.charAt(cut.length - 1) == ",") {
        cut = cut.slice(0, cut.length - 1);
      }
      if (cut.charAt(cut.length - 1) == " " && cut.charAt(cut.length - 2) == ",") {
        cut = cut.slice(0, cut.length - 2);
      }
      rgb.push(cut.replace(/rgba+([(])*/g, ""));
    } else {
      rgb.push(e.replace(/rgb+([(])*/g, ""));
    }
  }
  return rgb;
};

extractInputShades = (allColor, uC) => {
  let inputShades = [];
  for (color of allColor) {
    for (c of uC) {
      if (c == color.rgb || c == color.hex) {
        if (color.shade != "white" && color.shade != "gray" && color.shade != "black") {
          inputShades.push(color.shade);
        }
      }
    }
  }
  return inputShades;
};

filterBadColors = formatted => {
  const badFilter = ["color: rgb", "color: rgba", "background-color: rgb", "background-color: rgba", "background-color: ", "color: "];
  const badColorsFiltered = proofNotNULL(formatted.match(/color: +([a-zA-Z])*/g))
    .filter(item => item !== badFilter[0])
    .filter(item => item !== badFilter[1])
    .filter(item => item !== badFilter[2])
    .filter(item => item !== badFilter[3])
    .filter(item => item !== badFilter[4])
    .filter(item => item !== badFilter[5]);
  let cutBadColors = [];
  for (let bad of badColorsFiltered) {
    cutBadColors.push(bad.replace("color: ", ""));
  }
  return cutBadColors;
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
