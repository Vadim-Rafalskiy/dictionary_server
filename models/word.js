const { Schema, model } = require('mongoose');
const Joi = require('joi');

const wordSchema = new Schema({
    pl: String,
    uk: String,
    serf: String,
    partOfSpeech: String,
const addJoiSchema = Joi.object({
    pl: Joi.string().required(),
    uk: Joi.string().required(),
    serf: Joi.string().required(),
    partOfSpeech: Joi.string().required(),
});

const Word = model('word', wordSchema);

module.exports = { Word, addJoiSchema };
