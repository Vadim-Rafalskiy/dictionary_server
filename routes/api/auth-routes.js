const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middlewares');

const ctrl = require('../../controllers/ctrl-auth');

const { validateBody } = require('../../utils');
const { userJoiSchemas } = require('../../models/user');

router.post('/register', validateBody(userJoiSchemas.register), ctrl.register);
router.post('/login', validateBody(userJoiSchemas.login), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);

module.exports = router;
