const { Schema, model } = require('mongoose');

const wordSchema = new Schema({
    pl: String,
    uk: String,
    serf: String,
    partOfSpeech: String,
});

const Word = model('word', wordSchema);

module.exports = Word;
