const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  goal: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
    default: 0,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Quest', QuestSchema);
