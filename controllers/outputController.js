const Analyze = require("../models/analyzeModel");
const ana = new Analyze();
const Colors = require("../models/ColorsModel");
const c = new Colors();

const fs = require("fs");
es = require("event-stream");

exports.getColorsDB = (req, res, next) => {
  Colors.getColors()
    .then(colors => {
      res.locals.colorsDB = colors;
      next();
    })
    .catch(err => {
      console.log(err);
    });
};

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
  // console.log()
  const result = ana.doAnalyze(res.locals.formatted, res.locals.colorsDB);

  res.render("index", {
    pageTitle: "Output",
    output: true,
    input: lines,
    color: result[0],
    fonts: result[1]
  });
  req.session.destroy();
};
