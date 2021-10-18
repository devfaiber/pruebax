"use strict"

const strings = require("./strings.json");

// port site
process.env.PORT = process.env.PORT || 3000;
// reconocer desarrollo o produccion
process.env.NODE_ENV = process.env.NODE_ENV || "DEV"

let mongoUri = null;
if(!process.env.MONGO_FULLURI){
    if(process.env.MONGO_USER && process.env.MONGO_PWD && 
        process.env.MONGO_HOST && process.env.MONGO_PORT &&
        process.env.MONGO_DBNAME){
        mongoUri = `mongodb://${process.env.MONGO_USE}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`;
    } else {
        throw new Error(strings.MONGO_FAILED_CREDENTIALS);
    }
} else {
    mongoUri = process.env.MONGO_FULLURI;
}
process.env.MONGO_URI = mongoUri;