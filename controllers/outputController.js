const Analyze = require("../models/analyzeModel");
const fs = require("fs");
es = require("event-stream");

exports.postOutputPage = (req, res, next) => {
  const lines = [];
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
          console.log(lines);
        })
    );

  const ana = new Analyze();
  const result = ana.doAnalyze();

  res.render("index", {
    pageTitle: "Output",
    output: true,
    input: lines,
    color: result[0],
    fonts: result[1]
  });
  req.session.destroy();
  deleteFile(req);
};

deleteFile = req => {
  fs.unlinkSync(req.file.path, err => {
    if (err) {
      throw new Error(err);
      return;
    }
  });
};

// splitArray = req => {
//   var fs = require("fs");
//   fs.readFile(req.file.path, function(err, data) {
//     if (err) throw err;
//     var array = data.toString().split("\r\n");
//     for (i in array) {
//       // console.log(array[i]);
//       return array[i];
//     }
//     done();
//   });
// };
