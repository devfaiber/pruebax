const strings = require("./../config/strings.json");
const controllerAction = require("./userAction");
const {validateObject, validateRequest} = require("./../validations/validation");
const controller = {
    conectiondb: null,
    manage: (req, res) => {
        const response = controller._getResponseBase();
        controllerAction.connectionDB = controller.conectiondb;
        if(!validateRequest.validateFormatRequest(req.body, response)){
            return res.status(response.statusCode).json(response);
        }

        let result = validateObject.valid(req.body.body, response);
        if(!result){
            return res.status(response.statusCode).json(response);
        }

        switch(req.body.body.type.toUpperCase()){
            case 'INSERT':
                controllerAction.save(req.body.body, response, res);
            break;
            case 'LIST':
                controllerAction.list(response, res);
            break;
            case 'READ':
                controllerAction.read(req.body.body, response, res);
            break;
            case 'UPDATE':
                controllerAction.update(req.body.body, response, res);
            break;
            case 'DELETE':
                controllerAction.delete(req.body.body, response, res);
            break;
            default:
                response.message = strings.METHOD_TYPE_NULLABLE;
                response.statusCode = 500;
                res.status(response.statusCode).json(response);
        }
        
    },
    // funciones auxiliares
    _getResponseBase: ()=>{
        return {
            statusCode: 200,
            isBase64Encoded: false,
            headers: {
                "Content-Type": "application/json"
            },
            body: null,
            message: null
        };
    },
}

module.exports = controller;