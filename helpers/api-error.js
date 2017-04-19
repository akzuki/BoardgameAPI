'use strict';

const httpStatus = require('http-status');

/**
 * @extends Error
 */
class ExtendableError extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
    }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR) {
        super(message, status);
    }
}

// 2xx

// 3xx

// 4xx
const badRequestError = new APIError('Invalid params', httpStatus.BAD_REQUEST); // 400
const existingEmailError = new APIError('Email has been used.', httpStatus.BAD_REQUEST); // 400
const unauthorizedError = new APIError('Invalid token', httpStatus.UNAUTHORIZED); // 401
const notFoundError = new APIError('Not found', httpStatus.NOT_FOUND); // 404
// 5xx
const internalServerError = new APIError('Unexpected database error.', httpStatus.INTERNAL_SERVER_ERROR);


module.exports = {
    APIError,
    badRequestError,
    existingEmailError,
    unauthorizedError,
    notFoundError,
    internalServerError
};
