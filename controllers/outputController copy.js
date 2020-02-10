const Analyze = require("../models/analyzeModel");
const ana = new Analyze();
const Colors = require("../models/ColorsModel");
const c = new Colors();

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
  } else {
    // for direct input
    let input = req.body.directInput;
    lines = input.split("\n");
  }

  let result = [];
  Colors.getColors()
    .then(colors => {
      const file = req.file.path;
      result = ana.doAnalyze(colors, file);
      res.render("index", {
        pageTitle: "Output",
        output: true,
        input: lines,
        color: result[0],
        fonts: result[1]
      });
      req.session.destroy();
    })
    .catch(err => {
      console.log(err);
    });
  fs.unlinkSync(req.file.path, err => {
    if (err) {
      throw new Error(err);
      return;
    }
  });
};
