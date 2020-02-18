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
  const extracedInputRGB = formatted.match(/rgb+([a(0-9, ])*/g);
  const extractedInputHEX = formatted.match(/#+([0-9a-zA-Z])*/g);

  if (extracedInputRGB != null && extractedInputHEX != null) {
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
    console.log(badColors);
    console.log(usedShades.length);

    return colorAna;
  } else {
    colorAna.push("You didn't use any colors, that's why we can't analyze something.");
    return colorAna;
  }
};

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

unique = many => {
  return many.filter(function(value, index, self) {
    return many.indexOf(value) === index;
  });
};

filterBadColors = formatted => {
  const badFilter = ["color: rgb", "color: rgba", "background-color: rgb", "background-color: rgba", "background-color: ", "color: "];
  const badColorsFiltered = formatted
    .match(/color: +([a-zA-Z])*/g)
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

// const yellowDB = dbData.yellowDB;
// const blueDB = dbData.blueDB;
// const brownDB = dbData.brownDB;
// const grayDB = dbData.grayDB;
// const greenDB = dbData.greenDB;
// const orangeDB = dbData.orangeDB;
// const redDB = dbData.redDB;
// const violettDB = dbData.violettDB;
// const whiteDB = dbData.whiteDB;

// const rgbDB = extractRGBdb(allColors);
//   const hexDB = extractHEXdb(allColors);

// extractRGBdb = allColor => {
//   let rgbs = [];
//   for (rgb of allColor) {
//     const rgbContentDB = rgb.rgb;
//     rgbs.push(rgbContentDB.replace(/-/g, ", "));
//   }
//   return rgbs;
// };

// extractHEXdb = allColor => {
//   let hexs = [];
//   for (hex of allColor) {
//     hexs.push(hex.hex);
//   }
//   return hexs;
// };
