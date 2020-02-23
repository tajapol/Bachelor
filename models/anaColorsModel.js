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
  const contrast = dbData.contrastDB;

  let colorAna = [];
  const notPrintTwiceBad = [];
  const notPrintTwiceMedium = [];
  let goodContrast = [];
  let checkCommonColors = [];

  let count = 0;

  const allColors = dbData.colorsDB;
  const checkColorUsed = formatted.match(/color: +([a-zA-Z])*/g);
  let extracedInputRGB = proofNotNULL(formatted.match(/rgb+([a(0-9, ])*/g));
  let extractedInputHEX = proofNotNULL(formatted.match(/#+([0-9a-zA-Z])*/g));

  const usedRGB = unique(extractInputRGB(extracedInputRGB));
  const usedHEX = unique(extractedInputHEX);
  const usedColors = usedHEX.concat(usedRGB);

  const badColors = unique(filterBadColors(formatted));
  const usedShades = unique(extractInputShades(allColors, usedColors));

  switch (true) {
    case extracedInputRGB.length == 0 && extractedInputHEX.length == 0 && checkColorUsed == null:
      colorAna.push("You didn't use any colors, that's why we can't analyze something.");
      break;

    //////////////////////////////////// rule 1 only use rgb, rgba, hex //////////////////////////////////

    case badColors.length >= 1:
      colorAna.push("You use " + badColors + " instead of rgb or hex colors. You should change that.");

    // ///////////////////https://birgithotz.com/website-farbkonzept////////////////////////////////
    //////////////////////////////////// rule 2: max 2 colors (except black, white, gray) //////////////////////////////////

    case usedShades.length > 2:
      colorAna.push("You use more than 2 primarycolors. In most cases this is too much.");
  }

  // ///////////////////   Grundkurs gutes Webdesign S.333 ///////////////////////////////
  // /////////// https://www.talu.de/komplementaerfarben-definition/ ///////////////////
  //////////////////////////////////// rule 3: contrast //////////////////////////////////

  if (usedShades.includes("yellow")) {
    count = 0;
    for (let u of usedShades) {
      if (contrast[2].yellow.includes(u)) {
        if (!notPrintTwiceMedium.includes(u)) {
          notPrintTwiceMedium.push(u, "yellow");
          colorAna.push("You combined YELLOW with " + u + ",  which only offers a medium contrast. That may be ok, but you should check it again. ");
        }
      }

      if (contrast[1].yellow.includes(u)) {
        count++;
        if (!notPrintTwiceBad.includes(u)) {
          notPrintTwiceBad.push(u, "yellow");
          colorAna.push("You combined YELLOW with " + u + ",  which only offers bad contrast.");
        }
      }
    }

    if (count >= 1) {
      goodContrast.push(contrast[0].yellow);
      checkCommonColors.push("darkyellow");
      colorAna.push("Better colors to combine with DARKYELLOW would be: " + contrast[0].darkyellow + ".");
      count = 0;
    }
  }

  if (usedShades.includes("darkyellow")) {
    count = 0;
    for (let u of usedShades) {
      if (contrast[2].darkyellow.includes(u)) {
        if (!notPrintTwiceMedium.includes(u)) {
          notPrintTwiceMedium.push(u, "darkyellow");
          colorAna.push(
            "You combined DARKYELLOW with " + u + ",  which only offers a medium contrast. That may be ok, but you should check it again. "
          );
        }
      }

      if (contrast[1].darkyellow.includes(u)) {
        count++;
        if (!notPrintTwiceBad.includes(u)) {
          notPrintTwiceBad.push(u, "darkyellow");
          colorAna.push("You combined DARKYELLOW with " + u + ",  which only offers bad contrast.");
        }
      }
    }

    if (count >= 1) {
      goodContrast.push(contrast[0].darkyellow);
      checkCommonColors.push("darkyellow");
      colorAna.push("Better colors to combine with DARKYELLOW would be: " + contrast[0].darkyellow + ".");
      count = 0;
    }
  }

  if (usedShades.includes("lightorange")) {
    count = 0;
    for (let u of usedShades) {
      if (contrast[2].lightorange.includes(u)) {
        if (!notPrintTwiceMedium.includes(u)) {
          notPrintTwiceMedium.push(u, "lightorange");
          colorAna.push(
            "You combined LIGHTORANGE with " + u + ",  which only offers a medium contrast. That may be ok, but you should check it again. "
          );
        }
      }

      if (contrast[1].lightorange.includes(u)) {
        count++;
        if (!notPrintTwiceBad.includes(u)) {
          notPrintTwiceBad.push(u, "lightorange");
          colorAna.push("You combined LIGHTORANGE with " + u + ",  which only offers bad contrast.");
        }
      }
    }

    if (count >= 1) {
      goodContrast.push(contrast[0].lightorange);
      checkCommonColors.push("lightorange");
      colorAna.push("Better colors to combine with LIGHTORANGE would be: " + contrast[0].lightorange + ".");
      count = 0;
    }
  }

  if (usedShades.includes("orange")) {
    count = 0;
    for (let u of usedShades) {
      if (contrast[2].orange.includes(u)) {
        if (!notPrintTwiceMedium.includes(u)) {
          notPrintTwiceMedium.push(u, "orange");
          colorAna.push("You combined ORANGE with " + u + ",  which only offers a medium contrast. That may be ok, but you should check it again. ");
        }
      }

      if (contrast[1].orange.includes(u)) {
        count++;
        if (!notPrintTwiceBad.includes(u)) {
          notPrintTwiceBad.push(u, "orange");
          colorAna.push("You combined ORANGE with " + u + ",  which only offers bad contrast.");
        }
      }
    }

    if (count >= 1) {
      goodContrast.push(contrast[0].orange);
      checkCommonColors.push("orange");
      colorAna.push("Better colors to combine with ORANGE would be: " + contrast[0].orange + ".");
      count = 0;
    }
  }

  if (usedShades.includes("red")) {
    count = 0;
    for (let u of usedShades) {
      if (contrast[2].red.includes(u)) {
        if (!notPrintTwiceMedium.includes(u)) {
          notPrintTwiceMedium.push(u, "red");
          colorAna.push("You combined RED with " + u + ",  which only offers a medium contrast. That may be ok, but you should check it again. ");
        }
      }

      if (contrast[1].red.includes(u)) {
        count++;
        if (!notPrintTwiceBad.includes(u)) {
          notPrintTwiceBad.push(u, "red");
          colorAna.push("You combined RED with " + u + ",  which only offers bad contrast.");
        }
      }
    }

    if (count >= 1) {
      goodContrast.push(contrast[0].red);
      checkCommonColors.push("red");
      colorAna.push("Better colors to combine with RED would be: " + contrast[0].red + ".");
      count = 0;
    }
  }

  if (usedShades.includes("magenta")) {
    count = 0;
    for (let u of usedShades) {
      if (contrast[2].magenta.includes(u)) {
        if (!notPrintTwiceMedium.includes(u)) {
          notPrintTwiceMedium.push(u, "magenta");
          colorAna.push("You combined MAGENTA with " + u + ",  which only offers a medium contrast. That may be ok, but you should check it again. ");
        }
      }

      if (contrast[1].magenta.includes(u)) {
        count++;
        if (!notPrintTwiceBad.includes(u)) {
          notPrintTwiceBad.push(u, "magenta");
          colorAna.push("You combined MAGENTA with " + u + ",  which only offers bad contrast.");
        }
      }
    }

    if (count >= 1) {
      goodContrast.push(contrast[0].magenta);
      checkCommonColors.push("magenta");
      colorAna.push("Better colors to combine with MAGENTA would be: " + contrast[0].magenta + ".");
      count = 0;
    }
  }

  if (usedShades.includes("violett")) {
    count = 0;
    for (let u of usedShades) {
      if (contrast[2].violett.includes(u)) {
        if (!notPrintTwiceMedium.includes(u)) {
          notPrintTwiceMedium.push(u, "violett");
          colorAna.push("You combined VIOELTT with " + u + ",  which only offers a medium contrast. That may be ok, but you should check it again. ");
        }
      }

      if (contrast[1].violett.includes(u)) {
        count++;
        if (!notPrintTwiceBad.includes(u)) {
          notPrintTwiceBad.push(u, "violett");
          colorAna.push("You combined VIOLETT with " + u + ",  which only offers bad contrast.");
        }
      }
    }

    if (count >= 1) {
      goodContrast.push(contrast[0].violett);
      checkCommonColors.push("violett");
      colorAna.push("Better colors to combine with VIOLETT would be: " + contrast[0].violett + ".");
      count = 0;
    }
  }

  if (usedShades.includes("darkblue")) {
    count = 0;
    for (let u of usedShades) {
      if (contrast[2].darkblue.includes(u)) {
        if (!notPrintTwiceMedium.includes(u)) {
          notPrintTwiceMedium.push(u, "darkblue");
          colorAna.push(
            "You combined DARKBLUE with " + u + ",  which only offers a medium contrast. That may be ok, but you should check it again. "
          );
        }
      }

      if (contrast[1].darkblue.includes(u)) {
        count++;
        if (!notPrintTwiceBad.includes(u)) {
          notPrintTwiceBad.push(u, "darkblue");
          colorAna.push("You combined DARKBLUE with " + u + ",  which only offers bad contrast.");
        }
      }
    }

    if (count >= 1) {
      goodContrast.push(contrast[0].darkblue);
      checkCommonColors.push("darkblue");
      colorAna.push("Better colors to combine with DARKBLUE would be: " + contrast[0].darkblue + ".");
      count = 0;
    }
  }

  if (usedShades.includes("blue")) {
    count = 0;
    for (let u of usedShades) {
      if (contrast[2].blue.includes(u)) {
        if (!notPrintTwiceMedium.includes(u)) {
          notPrintTwiceMedium.push(u, "blue");
          colorAna.push("You combined BLUE with " + u + ",  which only offers a medium contrast. That may be ok, but you should check it again. ");
        }
      }

      if (contrast[1].blue.includes(u)) {
        count++;
        if (!notPrintTwiceBad.includes(u)) {
          notPrintTwiceBad.push(u, "blue");
          colorAna.push("You combined BLUE with " + u + ",  which only offers bad contrast.");
        }
      }
    }

    if (count >= 1) {
      goodContrast.push(contrast[0].blue);
      checkCommonColors.push("blue");
      colorAna.push("Better colors to combine with BLUE would be: " + contrast[0].blue + ".");
      count = 0;
    }
  }

  if (usedShades.includes("cyan")) {
    count = 0;
    for (let u of usedShades) {
      if (contrast[2].cyan.includes(u)) {
        if (!notPrintTwiceMedium.includes(u)) {
          notPrintTwiceMedium.push(u, "cyan");
          colorAna.push("You combined CYAN with " + u + ",  which only offers a medium contrast. That may be ok, but you should check it again. ");
        }
      }

      if (contrast[1].cyan.includes(u)) {
        count++;
        if (!notPrintTwiceBad.includes(u)) {
          notPrintTwiceBad.push(u, "cyan");
          colorAna.push("You combined CYAN with " + u + ",  which only offers bad contrast.");
        }
      }
    }

    if (count >= 1) {
      goodContrast.push(contrast[0].cyan);
      checkCommonColors.push("cyan");
      colorAna.push("Better colors to combine with CYAN would be: " + contrast[0].cyan + ".");
      count = 0;
    }
  }

  if (usedShades.includes("green")) {
    count = 0;
    for (let u of usedShades) {
      if (contrast[2].green.includes(u)) {
        if (!notPrintTwiceMedium.includes(u)) {
          notPrintTwiceMedium.push(u, "green");
          colorAna.push("You combined GREEN with " + u + ",  which only offers a medium contrast. That may be ok, but you should check it again. ");
        }
      }

      if (contrast[1].green.includes(u)) {
        count++;
        if (!notPrintTwiceBad.includes(u)) {
          notPrintTwiceBad.push(u, "green");
          colorAna.push("You combined GREEN with " + u + ",  which only offers bad contrast.");
        }
      }
    }

    if (count >= 1) {
      goodContrast.push(contrast[0].green);
      checkCommonColors.push("green");
      colorAna.push("Better colors to combine with GREEN would be: " + contrast[0].green + ".");
      count = 0;
    }
  }

  if (usedShades.includes("lightgreen")) {
    count = 0;
    for (let u of usedShades) {
      if (contrast[2].lightgreen.includes(u)) {
        if (!notPrintTwiceMedium.includes(u)) {
          notPrintTwiceMedium.push(u, "lightgreen");
          colorAna.push(
            "You combined LIGHTGREEN with " + u + ",  which only offers a medium contrast. That may be ok, but you should check it again. "
          );
        }
      }

      if (contrast[1].lightgreen.includes(u)) {
        count++;
        if (!notPrintTwiceBad.includes(u)) {
          notPrintTwiceBad.push(u, "lightgreen");
          colorAna.push("You combined LIGHTGREEN with " + u + ",  which only offers bad contrast.");
        }
      }
    }

    if (count >= 1) {
      goodContrast.push(contrast[0].lightgreen);
      checkCommonColors.push("lightgreen");
      colorAna.push("Better colors to combine with LIGHTGREEN would be: " + contrast[0].lightgreen + ".");
      count = 0;
    }
  }

  /////////////////////////////////////////// best color /////////////////////////////////////

  let allGoodContrasts = [].concat.apply([], goodContrast);
  let commonColors = notUnique(allGoodContrasts);

  if (allGoodContrasts.length > 3) {
    switch (true) {
      case commonColors.length == 1:
        colorAna.push("The best color to combine with all your used colors would be " + unique(commonColors) + ".");
        break;

      case commonColors.length > 1:
        colorAna.push("The best colors to combine with all your used colors would be " + unique(commonColors) + ".");
        break;

      case commonColors.length == 0:
        colorAna.push("Your used colors havn't one color with good contrast in common. You may should overthink your color conzept.");
        break;
    }
  }

  console.log(notPrintTwiceBad);
  return colorAna;
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

filterBadColors = f => {
  const badFilter = ["color: rgb", "color: rgba", "background-color: rgb", "background-color: rgba", "background-color: ", "color: "];
  const badColorsFiltered = proofNotNULL(f.match(/color: +([a-zA-Z])*/g))
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
    return self.indexOf(value) === index;
  });
};

notUnique = many => {
  return many.filter(function(value, index, self) {
    return self.indexOf(value) !== index;
  });
};

proofNotNULL = check => {
  let toProof = [];
  check ? (toProof = check) : (toProof = []);
  return toProof;
};
