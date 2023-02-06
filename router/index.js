const express = require('express');
const router = express.Router();
const Auth = require('../controller/auth')

router.post('/signup', Auth.register);
router.post('/login', Auth.login);
router.get('/test', Auth.justTest);

module.exports = router