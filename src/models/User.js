import mongoose, { Schema } from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    money: {
      type: Number,
      required: true,
    },
    movements: {
      type: Schema.Types.ObjectId,
      ref: 'Movements',
    },
  },
  { versionKey: false, timestamps: true }
);

export const UserModel = mongoose.model('User', userSchema);
