const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authenticate.js');

const { getUserInfo } = require('../controllers/userControl');
const { userSearch } = require('../controllers/userControl');

router.get('/user', authenticate, getUserInfo);

router.get('/search', userSearch);

module.exports = router;
