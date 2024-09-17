const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const { HttpError } = require('../helpers');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;
    const [berer, token] = authorization.split(' ');

    if (berer !== 'Bearer' || !token) {
        next(HttpError(401));
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user) {
            next(HttpError(401));
        }
        next();
    } catch {
        next(HttpError(401));
    }
};

module.exports = authenticate;
