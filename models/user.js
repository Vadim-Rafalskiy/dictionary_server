const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../utils');

const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, '"name" must exist and must be a string'],
        },
        email: {
            type: String,
            match: emailRegExp,
            required: [true, '"email" must be exist and must be a valid'],
            unique: [true, 'A user with this email is already exist'],
        },
        password: {
            type: String,
            minlength: 8,
            required: [
                true,
                '"password" must exist and must be at least 8 characters long',
            ],
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerUserJoiSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().pattern(emailRegExp).lowercase().required(),
    password: Joi.string().min(8).required(),
});

const loginUserJoiSchema = Joi.object({
    email: Joi.string().trim().pattern(emailRegExp).lowercase().required(),
    password: Joi.string().min(8).required(),
});

const User = model('user', userSchema);

const userJoiSchemas = {
    register: registerUserJoiSchema,
    login: loginUserJoiSchema,
};

module.exports = { User, userJoiSchemas };
