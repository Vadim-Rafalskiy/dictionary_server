const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ctrlWrapper } = require('../utils');
require('dotenv').config();

const { User } = require('../models/user');

const { HttpError } = require('../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw HttpError(409, 'Email already exists');

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const { SECRET_KEY } = process.env;

    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, 'Email or password is invalid');

    const isPasswordCompaire = await bcrypt.compare(password, user.password);
    if (!isPasswordCompaire)
        throw HttpError(401, 'Email or password is invalid');

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
    });
};

const getCurrent = async (req, res) => {
    const { email, name } = req.user;
    res.json({ email, name });
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
};
