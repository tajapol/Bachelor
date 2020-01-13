const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

// connection and storing connection to db
const mongoConnect = callback => {
  MongoClient.connect("mongodb+srv://tajapol:bachelor@pukki-122bn.mongodb.net/test?retryWrites=true&w=majority", {
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
