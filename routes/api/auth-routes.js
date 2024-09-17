const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/ctrl-auth');

const { validateBody } = require('../../utils');
const { userJoiSchemas } = require('../../models/user');

router.post('/register', validateBody(userJoiSchemas.register), ctrl.register);
router.post('/login', validateBody(userJoiSchemas.login), ctrl.login);

module.exports = router;
