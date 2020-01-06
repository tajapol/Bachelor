const inputs = [];

exports.getInput = (req, res, next) => {
  const input = JSON.parse(JSON.stringify(req.body));
  const title = input.title;
  inputs.push({ title });
  console.log(inputs.title);
  next();
};

exports.inputs = inputs;
