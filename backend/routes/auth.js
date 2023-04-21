const express = require('express');
const router = express.Router();

const { userRegister } = require('backend/controllers/authControl');
const { userLogin } = require('backend/controllers/authControl');

router.post('/UserRegister', userRegister);

router.post('/login', userLogin);

module.exports = router;
