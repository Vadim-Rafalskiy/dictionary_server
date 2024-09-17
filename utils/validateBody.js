const { HttpError } = require('../helpers');

const validateBody = (schema) => {
    return async (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) return next(HttpError(400, error.message));
        req.body = value;
        next();
    };
};

module.exports = validateBody;
