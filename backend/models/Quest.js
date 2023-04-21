const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserSchema',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    action: {
      type: String,
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    objective: {
      type: Number,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quest', QuestSchema);
