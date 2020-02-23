const ColorAnalyze = require("../models/anaColorsModel");
const FontfamilyAnalyze = require("../models/anaFontfamilyModel");
const FontsizeAnalyze = require("../models/anaFontsizeModel");
const LayoutAnalyze = require("../models/anaLayoutModel");

const fs = require("fs");
es = require("event-stream");

exports.postOutputPage = (req, res, next) => {
  //get input, format String for output
  // for files
  let lines = [];
  if (req.file != undefined) {
    const s = fs
      .createReadStream(req.file.path)
      .pipe(es.split())
      .pipe(
        es
          .mapSync(function(line) {
            //pause the readstream
            s.pause();
            lines.push(line);
            s.resume();
          })
          .on("error", function(err) {
            console.log("Error:", err);
          })
          .on("end", function() {
            console.log("Finish reading.");
          })
      );
    fs.unlinkSync(req.file.path, err => {
      if (err) {
        throw new Error(err);
        return;
      }
    });
  } else {
    // for direct input
    let input = req.body.directInput;
    lines = input.split("\n");
  }

  let dbColorData = {
    formatted: res.locals.formatted,
    colorsDB: res.locals.colorsDB,
    contrastDB: res.locals.contrastDB
  };

  let dbFontsData = {
    formatted: res.locals.formatted,
    fontsDB: res.locals.fontsDB
  };

  let data = {
    formatted: res.locals.formatted,
    notFormatted: res.locals.notFormatted,
    choosenFormat: res.locals.choosenFormat
  };

  const anaLayout = new LayoutAnalyze();
  const anaColors = new ColorAnalyze();
  const anaFontfamily = new FontfamilyAnalyze();
  const anaFontsizes = new FontsizeAnalyze();

  const resultLayout = anaLayout.doAnalyzeLayout(data);
  const resultColors = anaColors.doAnalyzeColors(dbColorData);
  const resultFontfamily = anaFontfamily.doAnalyzeFontfamily(dbFontsData);
  const resultFontsize = anaFontsizes.doAnalyzeFontsize(data);

  const fine = ["Good work", " everthing fine."];

  resultLayout[0].length == 0 ? resultLayout[0].push(fine) : resultLayout[0];
  resultColors[0].length == 0 ? resultColors[0].push(fine) : resultColors[0];
  resultFontfamily[0].length == 0 ? resultFontfamily[0].push(fine) : resultFontfamily[0];
  resultFontsize[0].length == 0 ? resultFontsize[0].push(fine) : resultFontsize[0];

  res.render("index", {
    pageTitle: "Output",
    output: true,
    input: lines,
    layoutAna: resultLayout[0],
    colorAna: resultColors[0],
    fontfamilyAna: resultFontfamily[0],
    fontsizeAna: resultFontsize[0]
  });
  req.session.destroy();
};
