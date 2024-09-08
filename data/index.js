const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
const { log } = require('console');

const wordsPath = path.join(__dirname, 'words.json');

const getAll = async () => {
    const data = await fs.readFile(wordsPath);

    return JSON.parse(data);
};

const getById = async (id) => {
    const data = await getAll();
    const result = data.find((word) => word.id === id);

    return result || null;
};

const add = async (item) => {
    const { pl, uk, serf, partOfSpeech } = item;
    const data = await fs.readFile(wordsPath);
    const words = JSON.parse(data);

    const isDuplicate = words.some((word) => word.pl === item.pl);

    if (isDuplicate) {
        return new Error('Duplicate word ID');
    }

    const newWord = {
        id: nanoid(),
        pl,
        uk,
        serf,
        partOfSpeech,
    };

    words.push(newWord);
    await fs.writeFile(wordsPath, JSON.stringify(words, null, 4));
    return newWord;
};

const updateById = async (id, data) => {
    const words = await getAll();
    const index = words.findIndex((item) => item.id === id);

    if (index === -1) {
        return null;
    }

    words[index] = { id, ...data };
    await fs.writeFile(wordsPath, JSON.stringify(words, null, 4));

    return words[index];
};

const deleteById = async (id) => {
    const words = await getAll();
    const index = words.findIndex((item) => item.id === id);
    if (index === -1) {
        return null;
    }

    const [result] = words.splice(index, 1);
    await fs.writeFile(wordsPath, JSON.stringify(words, null, 4));
    return result;
};

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
};
