const { ctrlWrapper } = require('../utils');

const words = require('../data');

const { HttpError } = require('../helpers');

const getAllWords = async (req, res) => {
    const allWords = await words.getAll();
    res.json(allWords);
};

const getWordById = async (req, res) => {
    const { id } = req.params;

    const word = await words.getById(id);
    if (!word) throw HttpError(404);
    res.json(word);
};

const addWord = async (req, res) => {
    const newWord = await words.add(req.body);
    res.status(201).json(newWord);
};

const updateWordById = async (req, res) => {
    const { id } = req.params;

    const updatedWord = await words.updateById(id, req.body);
    if (!updatedWord) throw HttpError(404);
    res.json(updatedWord);
};

const deleteWordById = async (req, res) => {
    const { id } = req.params;

    const deletedWord = await words.deleteById(id);
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
