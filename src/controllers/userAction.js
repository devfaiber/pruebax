const Usuario = require("../models/Usuario");
const strings = require("./../config/strings.json");

const controllerAction = {
    save: (body, response, res)=>{
        const usuario = new Usuario({
            nombre: body.data.nombre,
            email: body.data.email,
            departamento: body.data.departamento,
            municipio: body.data.municipio,
            genero: body.data.genero
        });
        usuario.save((err, usuarioDB)=>{
            if(err){
                responseValid.makeValidateResult(response, err,strings.USER_SAVE_ERROR);
                if("_message" in err){
                    responseValid.makeValidateResult(response, err,err._message);
                }
            }
            responseValid.makeValidateResult(response, usuarioDB, strings.USER_SAVE_ERROR);
            if(usuarioDB){
                response.itemCreated = usuarioDB;
            }
            return res.status(response.statusCode).json(response);
        });
    },
    update: (body, response, res)=>{
        const usuario = new Usuario({
            nombre: body.data.nombre,
            email: body.data.email,
            departamento: body.data.departamento,
            municipio: body.data.municipio,
            genero: body.data.genero
        });

        Usuario.findOneAndUpdate({email: body.keys.email},usuario).exec((err,usuarioDB)=>{
            if(err){
                responseValid.makeValidateResult(response, err,err._message);
                return res.status(response.statusCode).json(response);
            }
            responseValid.makeValidateResult(response, usuarioDB, strings.USER_UPDATED_EMPTY);
            return res.status(response.statusCode).json(response);
        });

    },
    delete: (body, response, res)=>{
        Usuario.findOneAndDelete({email: body.keys.email},{}).exec((err, result)=>{
            if(err){
                responseValid.makeValidateResult(response, err, strings.USER_DELETE_ERROR);
                return res.status(response.statusCode).json(response);
            }
            
            responseValid.makeValidateResult(response, result, strings.USER_DELETED_EMPTY);
            if(result) response.itemDeleted = result;
            return res.status(response.statusCode).json(response);
        });
    },
    read: (body, response, res)=>{
        Usuario.findOne({email: body.keys.email}).exec((err, usuarioDB)=>{
            if(err){
                responseValid.makeValidateResult(response, err, strings.USER_GET_ERROR);
                return res.status(response.statusCode).json(response);    
            }
            responseValid.makeValidateResult(response, usuarioDB, strings.USER_NOT_FOUND);
            response.item = usuarioDB;
            return res.status(response.statusCode).json(response);
        });
    },
    list: (response, res)=>{
        Usuario.find({}).exec((err, usuarioDB)=>{
            if(err){
                responseValid.makeValidateResult(response, err, strings.USER_GET_ERROR);
                return res.status(response.statusCode).json(response);
            }
            responseValid.makeValidateResult(response, usuarioDB, strings.USER_NOT_FOUND);
            response.items = usuarioDB;
            return res.status(response.statusCode).json(response);
        });
    }
}

const responseValid = {
    makeValidateResult: (response, resultDB=null, messageForInvalid, code=404)=>{
        if(!resultDB || resultDB.length <= 0){
            response.statusCode = code;
            response.message = messageForInvalid;
        }
    }
}

module.exports = controllerAction;