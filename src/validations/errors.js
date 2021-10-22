const strings = require("./../config/strings.json");

const errors = {
    makeMessage: (messageWithCode, defaultMessage)=>{
        if(messageWithCode.includes("E11000")){
            return strings["MESSAGE_ERROR_E11000"];
        }
        return defaultMessage;
    }
}

module.exports = errors;