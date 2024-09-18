const { ctrlWrapper } = require('../utils');

const { Word } = require('../models/word');

const { HttpError } = require('../helpers');

const getAllWords = async (req, res) => {
    const allWords = await Word.find({}, '-createdAt -updatedAt');
    res.json(allWords);
};

const getWordById = async (req, res) => {
    const { id } = req.params;

    const word = await Word.findById(id, '-createdAt -updatedAt');
    if (!word) throw HttpError(404);
    res.json(word);
};

const addWord = async (req, res) => {
    const newWord = await Word.create(req.body);
    const { _id: owner } = req.user;

    const newWord = await Word.create({ ...req.body, owner });
    res.status(201).json(newWord);
};

const updateWordById = async (req, res) => {
    const { id } = req.params;

    const updatedWord = await Word.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (!updatedWord) throw HttpError(404);
    res.json(updatedWord);
};

const deleteWordById = async (req, res) => {
    const { id } = req.params;

    const deletedWord = await Word.findByIdAndDelete(id);
    if (!deletedWord) throw HttpError(404);
    res.json(deletedWord);
};

module.exports = {
    getAllWords: ctrlWrapper(getAllWords),
    getWordById: ctrlWrapper(getWordById),
    addWord: ctrlWrapper(addWord),
    updateWordById: ctrlWrapper(updateWordById),
    deleteWordById: ctrlWrapper(deleteWordById),
};
