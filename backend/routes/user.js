const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authenticate.js');

import { getMe } from '../controllers/userControl';
import { userSearch } from '../controllers/userControl';

router.get('/me', authMiddleware, getMe);

router.get('/search', userSearch);

module.exports = router;
