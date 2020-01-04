const path = require("path");

const express = require("express");
const expressHbs = require("express-handlebars");

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
const formatRoutes = require("./routes/chooseFormat");
const lpRoutes = require("./routes/lp");
const uploadRoutes = require("./routes/chooseUpload");
const fileRoute = require("./routes/fileUpload");
const inputRoute = require("./routes/directInput");

//serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "js")));

//own middlewares
app.use(formatRoutes);
app.use(lpRoutes);
app.use(fileRoute);
app.use(inputRoute);
app.use("/chooseUpload", uploadRoutes);

//setting 404 status
app.use(errorController.get404);

app.listen(3001);
