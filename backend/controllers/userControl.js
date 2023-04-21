const authMiddleware = require('../middlewares/authenticate.js');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authenticate.js');

exports.getMe = authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.userSearch = async (req, res) => {
    try {
        const searchQuery = req.query.query;
        const users = await User.find({ username: new RegExp(searchQuery, 'i') });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search users' });
    }
};