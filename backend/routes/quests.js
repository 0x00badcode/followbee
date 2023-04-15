const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongoose').Types;

const Quest = require('../models/Quest');
const User = require('../models/User');
const Follower = require('../models/Follower');

// Middleware for checking JWT authentication
const authenticate = require('../middlewares/authenticate');

// Get all quests for a content creator
router.get('/:creatorId/quests', async (req, res) => {
    try {
        const creatorId = req.params.creatorId;
        if (!ObjectId.isValid(creatorId)) {
            return res.status(400).json({ error: 'Invalid creator ID' });
        }

        const quests = await Quest.find({ creator: creatorId });
        res.status(200).json(quests);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new quest
router.post('/quests', authenticate, async (req, res) => {
    try {
        const { title, description, goal } = req.body;
        const creatorId = req.user.id;

        const newQuest = new Quest({
            title,
            description,
            goal,
            creator: creatorId,
        });

        await newQuest.save();
        res.status(201).json({ message: 'Quest created successfully', quest: newQuest });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a quest
router.put('/quests/:questId', authenticate, async (req, res) => {
    try {
        const questId = req.params.questId;
        const creatorId = req.user.id;
        const { title, description, goal, progress } = req.body;

        if (!ObjectId.isValid(questId)) {
            return res.status(400).json({ error: 'Invalid quest ID' });
        }

        const updatedQuest = await Quest.findOneAndUpdate(
            { _id: questId, creator: creatorId },
            { title, description, goal, progress },
            { new: true }
        );

        if (!updatedQuest) {
            return res.status(404).json({ error: 'Quest not found' });
        }

        res.status(200).json({ message: 'Quest updated successfully', quest: updatedQuest });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a quest
router.delete('/quests/:questId', authenticate, async (req, res) => {
    try {
        const questId = req.params.questId;
        const creatorId = req.user.id;

        if (!ObjectId.isValid(questId)) {
            return res.status(400).json({ error: 'Invalid quest ID' });
        }

        const deletedQuest = await Quest.findOneAndDelete({ _id: questId, creator: creatorId });

        if (!deletedQuest) {
            return res.status(404).json({ error: 'Quest not found' });
        }

        res.status(200).json({ message: 'Quest deleted successfully', quest: deletedQuest });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Follow a content creator
router.post('/:creatorId/follow', authenticate, async (req, res) => {
    try {
        const creatorId = req.params.creatorId;
        const followerId = req.user.id;

        if (!ObjectId.isValid(creatorId)) {
            return res.status(400).json({ error: 'Invalid creator ID' });
        }

        const newFollower = new Follower({ creator: creatorId, follower: followerId });
        await newFollower.save();
        res.status(201).json({ message: 'Followed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Unfollow a content creator
router.delete('/:creatorId/unfollow', authenticate, async (req, res) => {
    try {
        const creatorId = req.params.creatorId;
        const followerId = req.user.id;

        if (!ObjectId.isValid(creatorId)) {
            return res.status(400).json({ error: 'Invalid creator ID' });
        }

        const deletedFollower = await Follower.findOneAndDelete({ creator: creatorId, follower: followerId });

        if (!deletedFollower) {
            return res.status(404).json({ error: 'Relationship not found' });
        }

        res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/search', async (req, res) => {
    try {
        const searchQuery = req.query.query;
        const regex = new RegExp(searchQuery, 'i');
        const contentCreators = await User.find({ username: { $regex: regex }, isCreator: true });
        res.status(200).json(contentCreators);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

