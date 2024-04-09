const loggerEvent = require('../services/logger.services')
const logger = loggerEvent('API error')
class ApiError extends Error {
    constructor(message, statuscode) {
        logger.error(message)

        super(message)
        this.statuscode = statuscode
        this.status=`${statuscode}`.startsWith(4)?'fail':'error';
        this.isOperational=true
    }
}
module.exports = ApiError;
