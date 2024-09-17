const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/ctrl-words');

const { validateBody } = require('../../utils');
const { isValidId, authenticate } = require('../../middlewares');

const { addWordJoiSchema } = require('../../models/word');

router.get('/', authenticate, ctrl.getAllWords);

router.get('/:id', authenticate, isValidId, ctrl.getWordById);

router.post('/', authenticate, validateBody(addWordJoiSchema), ctrl.addWord);

router.put(
    '/:id',
    isValidId,
    validateBody(addWordJoiSchema),
    ctrl.updateWordById
);

router.delete('/:id', isValidId, ctrl.deleteWordById);

module.exports = router;
