const express = require('express');
const router = express.Router();

const { userRegister } = require('../controllers/authControl');
const { userLogin } = require('../controllers/authControl');

router.post('/register', userRegister);

router.post('/login', userLogin);

module.exports = router;
