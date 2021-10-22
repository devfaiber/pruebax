// require("dotenv").config();
require("./config/config")
const controller = require('./controllers/userController');
const express = require("express");
const app = express();
const strings = require('./config/strings.json');
// parse aplication/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); 

// parse aplication/json
app.use(express.json());


// configuracion global de rutas

var db = null,
    dbDetails = new Object();
var mongoURL = process.env.MONGO_URI;
var initDb = function(callback) {
  if (mongoURL == null) return;

  var mongodb = require('mongodb');
  if (mongodb == null) return;

  mongodb.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
    }
    db = conn;
    db.collection("usuarios").createIndex("email", { unique: true });

    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

app.post("/api/v1/users", function(req,res){

  if (!db) {
    initDb(function(err){});
  }
  if(db){
    controller.conectiondb = db;
    controller.manage.call(this, req, res);
  }
});

initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});

// conexion al puerto
app.listen(process.env.PORT,process.env.IP_NODEAPP,()=>{
    console.log(strings.APP_LISTEN_PORT.replace("#$port", process.env.PORT))
})