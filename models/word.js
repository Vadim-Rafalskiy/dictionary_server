const { Schema, model } = require('mongoose');
const Joi = require('joi');

const wordSchema = new Schema(
    {
        pl: {
            type: String,
            required: true,
        },
        uk: {
            type: String,
            required: true,
        },
        serf: {
            type: String,
            enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            required: true,
        },
        partOfSpeech: {
            type: String,
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

const addJoiSchema = Joi.object({
    pl: Joi.string().required(),
    uk: Joi.string().required(),
    serf: Joi.string().required(),
    partOfSpeech: Joi.string().required(),
});

const Word = model('word', wordSchema);

module.exports = { Word, addJoiSchema };
