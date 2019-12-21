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
const formatRoutes = require("./routes/format");
const indexRoutes = require("./routes/index");
const uploadRoutes = require("./routes/upload");

//serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, "background.png")));

//own middlewares
app.use(formatRoutes);
app.use(indexRoutes);
app.use("/upload", uploadRoutes);

//setting 404 status
app.use(errorController.get404);

app.listen(3001);
