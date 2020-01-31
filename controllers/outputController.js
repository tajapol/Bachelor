const Analyze = require("../models/analyzeModel");
// const fs = require("fs");

exports.postOutputPage = (req, res, next) => {
  // const formatedInput = fs.readFileSync(req.file.path, "utf8");

  const ana = new Analyze();
  const result = ana.doAnalyze();

  const directInput = req.file;

  req.session.destroy();
  // deleteFile(req);

  res.render("index", { pageTitle: "Output", output: true, input: directInput, color: result[0], fonts: result[1] });
};

// deleteFile = req => {
//   fs.unlinkSync(req.file.path, err => {
//     if (err) {
//       throw new Error(err);
//       return;
//     }
//   });
// };
