const mongoose = require('mongoose');

const CreatorSchema = new mongoose.Schema({
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
  description: {
    type: String,
    default: '',
  },
  followerCount: {
    type: Number,
    default: 0,
  },
  dashboardLayout: {
    type: String,
    default: 'default',
  },
  // Add any other fields you need for content creators
});

module.exports = mongoose.model('Creator', CreatorSchema);
