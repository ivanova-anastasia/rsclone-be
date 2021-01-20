import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, trim: true },
    score: { type: String, required: true, trim: true },
    totalTime: { type: String, required: true, trim: true },
  },
  {
    versionKey: false,
  }
);

const GameModel = mongoose.model('Statistics', GameSchema);

export { GameModel };
