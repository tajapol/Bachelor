const path = require("path");

const express = require("express");
const expressHbs = require("express-handlebars");

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
const formatRoutes = require("./routes/formats");
const indexRoutes = require("./routes/index");
const uploadRoutes = require("./routes/uploads");

//serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));

//own middlewares
app.use(formatRoutes);
app.use(indexRoutes);
app.use(uploadRoutes);

// app.use("/uploads", uploadRoutes);

//setting 404 status
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found" });
});

app.listen(3001);
