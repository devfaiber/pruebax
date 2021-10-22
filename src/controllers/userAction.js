const strings = require("./../config/strings.json");
const errorMessages = require("./../validations/errors");
const controllerAction = {
    connectionDB: null,
    save: (body, response, res)=>{
        const usuario = {
            nombre: body.data.nombre,
            email: body.data.email,
            departamento: body.data.departamento,
            municipio: body.data.municipio,
            genero: body.data.genero
        };

        let collection =  controllerAction.connectionDB.collection("usuarios");

        
        collection.insertOne(usuario).then((result)=>{
            responseValid.makeValidateResult(response, result.insertedId, strings.USER_SAVE_ERROR);
            if(result.insertedId){
                response.itemCreatedId = result.insertedId;
            }
            response.itemCreatedId = result.insertedId;
            return res.status(response.statusCode).json(response);
        }).catch((err)=>{
            let message = errorMessages.makeMessage(err.errmsg, strings.USER_SAVE_ERROR);
            responseValid.makeValidateResult(response, !err,message);
            return res.status(response.statusCode).json(response);
        });
    },
    update: (body, response, res)=>{
        const usuario = {
            nombre: body.data.nombre,
            email: body.data.email,
            departamento: body.data.departamento,
            municipio: body.data.municipio,
            genero: body.data.genero
        };

        let collection =  controllerAction.connectionDB.collection("usuarios");
        collection.findOneAndUpdate({email: body.keys.email},usuario).then((usuarioDB)=>{
            responseValid.makeValidateResult(response, usuarioDB.value, strings.USER_UPDATED_EMPTY);
            if(usuarioDB.value) response.itemUpdated = usuarioDB.value;
            return res.status(response.statusCode).json(response);
        }).catch((err)=>{
            responseValid.makeValidateResult(response, !err,strings.USER_UPDATE_ERROR);
            return res.status(response.statusCode).json(response);
        });

    },
    delete: (body, response, res)=>{
        let collection =  controllerAction.connectionDB.collection("usuarios");
        collection.findOneAndDelete({email: body.keys.email},{}).then((result)=>{ 
            console.log(result);
            responseValid.makeValidateResult(response, result.value, strings.USER_DELETED_EMPTY);
            if(result.lastErrorObject.value) response.itemDeleted = result.value;
            return res.status(response.statusCode).json(response);
        }).catch((err)=>{
            responseValid.makeValidateResult(response, !err, strings.USER_DELETE_ERROR);
            return res.status(response.statusCode).json(response);
        });
    },
    read: (body, response, res)=>{
        let collection =  controllerAction.connectionDB.collection("usuarios");
        collection.findOne({email: body.keys.email}).then((usuarioDB)=>{
            
            responseValid.makeValidateResult(response, usuarioDB, strings.USER_NOT_FOUND);
            response.item = usuarioDB;
            return res.status(response.statusCode).json(response);
        }).catch((err)=>{
            responseValid.makeValidateResult(response, !err, strings.USER_GET_ERROR);
            return res.status(response.statusCode).json(response);    
        });
    },
    list: (response, res)=>{
        let collection = controllerAction.connectionDB.collection('usuarios');
        collection.find({}).toArray((err, usuarioDB)=>{
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