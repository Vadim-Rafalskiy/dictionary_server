const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/ctrl-words');

const { validateBody } = require('../../utils');
const { addJoiSchema } = require('../../models/word');

router.get('/', ctrl.getAllWords);

router.get('/:id', ctrl.getWordById);

router.post('/', validateBody(addJoiSchema), ctrl.addWord);

router.put('/:id', validateBody(addJoiSchema), ctrl.updateWordById);

router.delete('/:id', ctrl.deleteWordById);

module.exports = router;
