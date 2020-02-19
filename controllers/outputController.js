const ColorAnalyze = require("../models/anaColorsModel");
const FontAnalyze = require("../models/anaFontsModel");

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
    fontsDB: res.locals.fontsDB,
    choosenFormat: res.locals.choosenFormat
  };

  const anaColors = new ColorAnalyze();
  const anaFonts = new FontAnalyze();
  const resultColors = anaColors.doAnalyzeColors(dbColorData);
  const resultFonts = anaFonts.doAnalyzeFonts(dbFontsData);

  res.render("index", {
    pageTitle: "Output",
    output: true,
    input: lines,
    color: resultColors[0],
    fonts: resultFonts[0]
  });
  req.session.destroy();
};
