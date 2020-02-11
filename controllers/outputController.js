const Analyze = require("../models/analyzeModel");

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

  const ana = new Analyze();

  let dbData = {
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
    whiteDB: res.locals.whiteDB,
    fontsDB: res.locals.fontsDB,
    serifDB: res.locals.serifDB,
    sansSerifDB: res.locals.sansSerifDB,
    monospaceDB: res.locals.monospaceDB,
    fantasyDB: res.locals.fantasyDB
  };

  const result = ana.doAnalyze(dbData);

  res.render("index", {
    pageTitle: "Output",
    output: true,
    input: lines,
    color: result[0],
    fonts: result[1]
  });
  req.session.destroy();
};
