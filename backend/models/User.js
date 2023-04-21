const mongoose = require('mongoose');

const CreatorInfoSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  gridLayout: [
  {
    questId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quest',
    },
    x: Number,
    y: Number,
    width: Number,
    height: Number,
  },
],

});

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  following : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  creatorInfo: CreatorInfoSchema,
});

module.exports = mongoose.model('User', User);
