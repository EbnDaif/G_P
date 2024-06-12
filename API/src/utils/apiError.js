const loggerEvent = require("../services/logger.services");
const logger = loggerEvent("API error");

class ApiError extends Error {
    constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
    this.status = `${statuscode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    logger.error(`[${this.status}] ${message}`);
  }
}

module.exports = ApiError;
