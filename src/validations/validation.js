const strings = require("./../config/strings.json");


/**
 * valida la estructura de los request por cada peticion
 */
const validateObject = {
    valid: (body, response)=>{
        let outputValid = null;
        switch(body.type.toUpperCase()){
            case 'INSERT':
                if(body.hasOwnProperty("data")){
                    outputValid = validateObject._validProperties(body.data, [
                        "email", "nombre", "departamento", "municipio", "genero"
                    ]);
                } else {
                    outputValid = {
                        valid: false,
                        fieldsInvalid: ["data{}"]
                    }
                }

            break;
            case 'READ':
                if(body.hasOwnProperty("keys")){
                    outputValid = validateObject._validProperties(body.keys, ["email"]);
                } else {
                    outputValid = {
                        valid: false,
                        fieldsInvalid: ["keys{}"]
                    }
                }
                
            break;
            case 'UPDATE':
                if(body.hasOwnProperty("data") && body.hasOwnProperty("keys")){
                    outputValid = validateObject._validProperties(body.keys, ["email"]);
                    if(outputValid.valid){
                        outputValid = validateObject._validProperties(body.data, [
                            "email", "nombre", "departamento", "municipio", "genero"
                        ]);
                    }
                } else {
                    outputValid = {
                        valid: false,
                        fieldsInvalid: []
                    }
                    if(!body.hasOwnProperty("data")) outputValid.fieldsInvalid.push("data{}");
                    if(!body.hasOwnProperty("keys")) outputValid.fieldsInvalid.push("keys{}");
                }
 
            break;
            case 'DELETE':
                if(body.hasOwnProperty("keys")){
                    outputValid = validateObject._validProperties(body.keys, ["email"]);
                } else {
                    outputValid = {
                        valid: false,
                        fieldsInvalid: ["keys{}"]
                    }
                }

            break;
        }
        // si esta validado
        if(outputValid == null || outputValid.valid){
            return true;
        }
        response.statusCode = 401;
        let message = strings.REQUEST_INVALID_FOR_METHOD.replace("#$type", body.type.toUpperCase());
        response.message = message.replace("#$fields",outputValid.fieldsInvalid.join(","));
        return false;
    },
    _validProperties: (objdata, properties=[])=>{
        let countValidProperties = 0;
        let fieldsInvalid = [];
        properties.forEach(value=>{
            if(objdata.hasOwnProperty(value) && objdata[value] != "" ){
                countValidProperties++;
            } else {
                fieldsInvalid.push(value);
            }
        });
        let output = {
            fieldsInvalid,
            valid: false
        };
        if(countValidProperties >= properties.length){
            output.valid = true;
        }
        return output
    }
}

const validateRequest = {
    validateFormatRequest: (body, response) => {
        if(body == null || !("body" in body)){
            response.statusCode = 401;
            response.message = strings.REQUEST_INVALID;
            return false;
        }
        if(body.body == null || body.body.type == null){
            response.statusCode = 401;
            response.message = strings.METHOD_TYPE_INVALID;
            return false;
        }
        return true;
    }
}

module.exports = {
    validateObject,
    validateRequest
};