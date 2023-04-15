const mongoose = require('mongoose');

const FollowerSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

FollowerSchema.index({ creator: 1, follower: 1 }, { unique: true });

module.exports = mongoose.model('Follower', FollowerSchema);
