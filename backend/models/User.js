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
});

const UserSchema = new mongoose.Schema({
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
  creatorInfo: CreatorInfoSchema,
});

module.exports = mongoose.model('User', UserSchema);
