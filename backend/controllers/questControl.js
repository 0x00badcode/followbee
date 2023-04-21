const Quest = require('../models/Quest');
const User = require('../models/User');
const Follower = require('../models/Follower');

const { ObjectId } = require('mongoose').Types;

const getQuestsForCreator = async (req, res) => {
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
};

const createNewQuest = async (req, res) => {
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
};

const updateQuest = async (req, res) => {
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
};

const deleteQuest = async (req, res) => {
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
};

const followCreator = async (req, res) => {
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
};

const unfollowCreator = async (req, res) => {
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
};

const searchContentCreators = async (req, res) => {
    try {
        const searchQuery = req.query.query;
        const regex = new RegExp(searchQuery, 'i');
        const contentCreators = await User.find({ username: { $regex: regex }, isCreator: true });
        res.status(200).json(contentCreators);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserQuestsAndLayout = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user || !user.creatorInfo) {
            return res.status(404).json({
                success: false,
                error: 'User not found or not a content creator',
            });
        }

        const layout = user.creatorInfo.gridLayout;
        const questIds = layout.map((item) => item.questId);
        const quests = await Quest.find({ _id: { $in: questIds } });

        return res.status(200).json({
            success: true,
            data: {
                quests,
                layout,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

module.exports = {
    getQuestsForCreator,
    createNewQuest,
    updateQuest,
    deleteQuest,
    followCreator,
    unfollowCreator,
    searchContentCreators,
    getUserQuestsAndLayout,
};
