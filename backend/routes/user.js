const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authenticate.js');

const { getMe } = require('../controllers/userControl');
const { userSearch } = require('../controllers/userControl');

console.log(getMe);

router.get('/me', authenticate, getMe);

router.get('/search', userSearch);

module.exports = router;
