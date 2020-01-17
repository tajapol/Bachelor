exports.postOutputPage = (req, res, next) => {
  const sessionId = req.sessionID;
  Session.endSession();
  res.render("index", { pageTitle: "Output" });
};
