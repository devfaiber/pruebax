const mongoose = require("mongoose")
const UniqueValidator = require("mongoose-unique-validator")
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

// inicializador de Scheme
let Schema = mongoose.Schema

let valGen ={
    values: ["Masculino","Femenino","Otro"],
    message: '{VALUES} no esta permitido, como genero'
}

// esquema del objeto 
let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true,"nombre necesario"]
    },
    email:{
        type: String,
        index: true,
        unique: true,
        required: [true,"email requerido"]
    },
    municipio:{
        type:String,
        required: [true,"password obligatoria"]
    },
    departamento:{
        type: String,
        required: [true,"email requerido"]
    },
    genero:{
        type: String,
        default: "Masculino",
        enum: valGen,
        
    }
})
// validacion unique validator
usuarioSchema.plugin(UniqueValidator,{message: '{PATH} email debe ser unico'})

// exportacion del modelo
module.exports = mongoose.model("Usuario",usuarioSchema)