const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/ctrl-words');

const { validateBody } = require('../../utils');


router.get('/', ctrl.getAllWords);

router.get('/:id', isValidId, ctrl.getWordById);


);


module.exports = router;
