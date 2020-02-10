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
  const result = ana.doAnalyze(
    res.locals.formatted,
    res.locals.colorsDB,
    res.locals.yellowDB,
    res.locals.blueDB,
    res.locals.brownDB,
    res.locals.grayDB,
    res.locals.greenDB,
    res.locals.orangeDB,
    res.locals.redDB,
    res.locals.violettDB,
    res.locals.whiteDB
  );

  res.render("index", {
    pageTitle: "Output",
    output: true,
    input: lines,
    color: result[0],
    fonts: result[1]
  });
  req.session.destroy();
};
