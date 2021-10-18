// require("dotenv").config();
require("./config/config")
const mongoose = require('mongoose');

const express = require("express");
const app = express();
const strings = require('./config/strings.json');
// parse aplication/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); 

// parse aplication/json
app.use(express.json());


// configuracion global de rutas
app.use("/api", require('./routes/userRouters'));


// conexion a mongo
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true},(err,resp)=>{
    // si falla hace esto
    if(err) throw err

    console.log(strings.DATABASE_ONLINE);
});



// conexion al puerto
app.listen(process.env.PORT,process.env.IP_NODEAPP,()=>{
    console.log(strings.APP_LISTEN_PORT.replace("#$port", process.env.PORT))
})