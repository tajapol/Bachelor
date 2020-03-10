const path = require("path");
const fs = require("fs");
const https = require("https");

const express = require("express");
const expressHbs = require("express-handlebars");
const session = require("express-session");

const bodyParser = require("body-parser");

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const mongoConnect = require("./util/database").mongoConnect;
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/errorController");

const app = express();
const store = new MongoDBStore({
  uri: "mongodb+srv://tajapol:bachelor@pukki-122bn.mongodb.net/test?retryWrites=true&w=majority",
  collection: "sessions"
});

app.post("/upload", parser.array("images", 10), function(req, res) {
  console.log(req.files);
});

//configuration object (uploadedFile storage)
const fileStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "folder-name",
  allowedFormats: ["text/css"],
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

//configuration object (only css accepted)
const fileFilter = (req, file, cb) => {
  file.mimetype === "text/css" ? cb(null, true) : cb(null, false);
};

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
const directOutputRoute = require("./routes/direct-output");
const fileOutputRoute = require("./routes/file-output");

// save logs in files
const accesLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
app.use(compression());
app.use(helmet());
app.use(morgan("combined", { stream: accesLogStream }));

//installed middlewares
// parsing texts
app.use(bodyParser.urlencoded({ extended: false }));
// parsing ONE file
app.use(multer({ storage: fileStorage }).single("file"));
app.use(session({ secret: "my secret", resave: false, saveUninitialized: false, store: store }));

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
app.use(directOutputRoute);
app.use(fileOutputRoute);

app.use("/500", errorController.get500);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(process.env.PORT);
});
