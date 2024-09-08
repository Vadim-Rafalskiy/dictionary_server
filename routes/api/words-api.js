const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/ctrl-words');

const { validateBody } = require('../../utils');
const schemas = require('../../schemas/wordsJoiSchema');

router.get('/', ctrl.getAllWords);

router.get('/:id', ctrl.getWordById);

router.post('/', validateBody(schemas.addSchema), ctrl.addWord);

router.put('/:id', validateBody(schemas.addSchema), ctrl.updateWordById);

router.delete('/:id', ctrl.deleteWordById);

module.exports = router;
