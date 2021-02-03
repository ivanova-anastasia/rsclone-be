import mongoose from 'mongoose';

const SessionsSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, trim: true, unique : true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true, trim: true },
    expiresAt: {type: String, trim: true}
  },
  {
    versionKey: false,
  }
);

const SessionsModel = mongoose.model('Sessions', SessionsSchema);

export { SessionsModel };
