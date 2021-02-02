import mongoose from 'mongoose';

const Userschema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true, unique : true },
    passwordHash: { type: String, required: true, trim: true }
  },
  {
    versionKey: false,
  }
);

const UsersModel = mongoose.model('Users', Userschema);

export { UsersModel };
