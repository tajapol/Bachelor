exports.postOutputPage = (req, res, next) => {
  // const output = new Output();
  // console.log(output.id);
  res.render("index", { pageTitle: "Output" });
};
