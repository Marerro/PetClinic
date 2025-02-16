const { validationResult } = require('express-validator');
const AppError = require('../utils/appError');

const validate = (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors
                .array()
                .map((error) => error.msg)
                .join("; ");

            throw new AppError(errorMessages, 400); 
        }

        next(); 
    } catch (error) {
        next(error); 
    }
};

module.exports = validate;