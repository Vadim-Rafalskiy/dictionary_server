const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/ctrl-words');

const { validateBody } = require('../../utils');
const { isValidId } = require('../../middlewares');

const { addWordJoiSchema } = require('../../models/word');

router.get('/', ctrl.getAllWords);

router.get('/:id', isValidId, ctrl.getWordById);

router.post('/', validateBody(addWordJoiSchema), ctrl.addWord);

router.put(
    '/:id',
    isValidId,
    validateBody(addWordJoiSchema),
    ctrl.updateWordById
);

router.delete('/:id', isValidId, ctrl.deleteWordById);

module.exports = router;
