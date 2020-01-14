const path = require("path");

const express = require("express");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoConnect = require("./util/database").mongoConnect;

// import error controller
const errorController = require("./controllers/error");

const app = express();

//register templating engine
app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views",
    defaultLayout: "",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

//own files imports
const formatRoutes = require("./routes/choose-format");
const lpRoutes = require("./routes/lp");
const uploadRoutes = require("./routes/choose-upload");
const directInputRoute = require("./routes/direct-input");
const fileUploadRoute = require("./routes/file-upload");
const outputRoute = require("./routes/output");

app.use(bodyParser.urlencoded({ extended: false }));

//serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "js")));

//own middlewares
app.use(lpRoutes);
app.use(formatRoutes);
app.use("/choose-upload", uploadRoutes);
app.use(directInputRoute);
app.use(fileUploadRoute);
app.use(outputRoute);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3001);
});
