// exports.getOutputPage = (req, res, next) => {
//   res.render("index", { pageTitle: "Output" });
// };

exports.postOutputPage = (req, res, next) => {
  const form = JSON.parse(JSON.stringify(req.body));
  console.log(form.title);
  console.log(req.body);
  res.render("index", { pageTitle: "Output" });
};
