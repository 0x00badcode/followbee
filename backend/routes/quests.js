const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongoose').Types;

const Quest = require('../models/Quest');
const User = require('../models/User');
const Follower = require('../models/Follower');

// Middleware for checking JWT authentication
const authenticate = require('../middlewares/authenticate');

const { getQuestsForCreator } = require('../controllers/questControl');
const { createNewQuest } = require('../controllers/questControl');
const { updateQuest } = require('../controllers/questControl');
const { deleteQuest } = require('../controllers/questControl');
const { FollowCreator } = require('../controllers/questControl');
const { unfollowCreator } = require('../controllers/questControl');
const { searchContentCreators } = require('../controllers/questControl');
const { getUserQuestsAndLayout } = require('../controllers/questControl');

// Get all quests for a content creator
router.get('/:creatorId/quests', getQuestsForCreator);

// Create a new quest
router.post('/quests', authenticate, createNewQuest);

// Update a quest
router.put('/quests/:questId', authenticate, updateQuest);

// Delete a quest
router.delete('/quests/:questId', authenticate, deleteQuest);

// Follow a content creator
router.post('/:creatorId/follow', authenticate, FollowCreator);

// Unfollow a content creator
router.delete('/:creatorId/unfollow', authenticate, unfollowCreator);

// Search for content creators
router.get('/search', searchContentCreators);

// Get quests and layout for a user
router.get('/:username/layout', getUserQuestsAndLayout);

module.exports = router;

