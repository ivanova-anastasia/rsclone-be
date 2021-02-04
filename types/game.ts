import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
      trim: true,
    },
    score: { type: Number, required: true, trim: true },
    totalTime: { type: String, trim: true },
  },
  {
    versionKey: false,
  }
);

const GameModel = mongoose.model('Statistics', GameSchema);

export { GameModel };
