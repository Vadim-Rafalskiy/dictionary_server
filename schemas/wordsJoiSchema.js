const Joi = require('joi');

const addSchema = Joi.object({
    pl: Joi.string().required(),
    uk: Joi.string().required(),
    serf: Joi.string().required(),
    partOfSpeech: Joi.string().required(),
});

module.exports = {
    addSchema,
};
