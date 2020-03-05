const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const config = require("../public/config/local.json");

let db;

// connection and storing connection to db
const mongoConnect = callback => {
  MongoClient.connect(config.dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

    .then(client => {
      console.log("Connected!");
      db = client.db();
      callback();
    })

    .catch(err => {
      console.log(err);
      throw err;
    });
};

// return instance to connected DB
const getDb = () => {
  if (db) {
    return db;
  }
  throw "Database not found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
