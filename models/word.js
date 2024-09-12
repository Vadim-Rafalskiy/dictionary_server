const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../utils');

const sertifikatesList = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const wordSchema = new Schema(
    {
        pl: {
            type: String,
            required: [true, '"pl" must exist and must be a string'],
        },
        uk: {
            type: String,
            required: [true, '"uk" must exist and must be a string'],
        },
        serf: {
            type: String,
            enum: sertifikatesList,
            required: true,
        },
        partOfSpeech: {
            type: String,
            required: [true, '"partOfSpeech" must exist and must be a string'],
        },
    },
    { versionKey: false, timestamps: true }
);

wordSchema.post('save', handleMongooseError);

const addJoiSchema = Joi.object({
    pl: Joi.string().required(),
    uk: Joi.string().required(),
    serf: Joi.string().required(),
    partOfSpeech: Joi.string().required(),
});

const Word = model('word', wordSchema);

module.exports = { Word, addJoiSchema };
