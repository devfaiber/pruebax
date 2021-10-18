const strings = require("./../config/strings.json");
const controllerAction = require("./userAction");
const controller = {
    manage: (req, res) => {
        const response = controller._getResponseBase();
        if(!controller._validateFormatRequest(req.body, response)){
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
    _validateFormatRequest: (body, response) => {
        if(body == null || !("body" in body)){
            response.statusCode = 404;
            response.message = strings.REQUEST_INVALID;
            return false;
        }
        return true;
    }
}

module.exports = controller;