const ColorAnalyze = require("../models/anaColorsModel");
const FontfamilyAnalyze = require("../models/anaFontfamilyModel");
const FontsizeAnalyze = require("../models/anaFontsizeModel");

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
    notFormatted: res.locals.notFormatted,
    colorsDB: res.locals.colorsDB,
    yellowDB: res.locals.yellowDB,
    blueDB: res.locals.blueDB,
    brownDB: res.locals.brownDB,
    grayDB: res.locals.grayDB,
    greenDB: res.locals.greenDB,
    orangeDB: res.locals.orangeDB,
    redDB: res.locals.redDB,
    violettDB: res.locals.violettDB,
    whiteDB: res.locals.whiteDB
  };

  let dbFontsData = {
    formatted: res.locals.formatted,
    notFormatted: res.locals.notFormatted,
    fontsDB: res.locals.fontsDB,
    choosenFormat: res.locals.choosenFormat
  };

  const anaColors = new ColorAnalyze();
  const anaFontfamily = new FontfamilyAnalyze();
  const anaFontsizes = new FontsizeAnalyze();
  const resultColors = anaColors.doAnalyzeColors(dbColorData);
  const resultFontfamily = anaFontfamily.doAnalyzeFontfamily(dbFontsData);
  const resultFontsize = anaFontsizes.doAnalyzeFontsize(dbFontsData);

  const fine = ["Good work", " everthing fine."];
  resultColors[0].length == 0 ? resultColors[0].push(fine) : resultColors[0];
  resultFontfamily[0].length == 0 ? resultFontfamily[0].push(fine) : resultFontfamily[0];
  resultFontsize[0].length == 0 ? resultFontsize[0].push(fine) : resultFontsize[0];

  res.render("index", {
    pageTitle: "Output",
    output: true,
    input: lines,
    color: resultColors[0],
    fontfamily: resultFontfamily[0],
    fontsize: resultFontsize[0]
  });
  req.session.destroy();
};
