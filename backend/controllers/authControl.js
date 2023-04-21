const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userRegister = async (req, res) => {
    console.log('userRegister called');
    try {
        const { username, email, password, isCreator } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser;
        if (isCreator) {
            newUser = new User({
                username,
                email,
                password: hashedPassword,
                creatorInfo: {
                    profilePicture: null,
                    description: null,
                    gridLayout: []
                }
            });
        } else {
            newUser = new User({ username, email, password: hashedPassword });
        }

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.userLogin = async (req, res) => {
    console.log('userLogin called');
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token: `Bearer ${token}`, isCreator: !!user.creatorInfo });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'});
    }
};
