const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserSchema',
      required: true,
    },
    title: {
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
      default: 'none',
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      enum: ['goal', 'timer'],
      required: true,
    },
    objective: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Date,
      required() {
        return this.type === 'timer';
      },
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quest', QuestSchema);
