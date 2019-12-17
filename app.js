const path = require("path");

const express = require("express");
const app = express();

//own files imports
const formatterRoutes = require("./routes/chooseFormat");
const indexRoutes = require("./routes/index");

//serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));

//import middlewares
app.use(formatterRoutes);
app.use(indexRoutes);

//setting 404 status
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3001);
