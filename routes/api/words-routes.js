const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/ctrl-words');

const { validateBody } = require('../../utils');

const { addWordJoiSchema } = require('../../models/word');

router.get('/', ctrl.getAllWords);

router.get('/:id', isValidId, ctrl.getWordById);


    validateBody(addWordJoiSchema),
);


module.exports = router;
