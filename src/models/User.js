import mongoose from 'mongoose';
import { Schema } from 'mongoose';

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

const UserModel = mongoose.model('User', userSchema);

export const showUsers = async () => {
  const users = await UserModel.find();
  console.log(users);
};

export const createUser = async () => {
  const user = new UserModel({
    name: 'Oscar',
    username: 'Osquital',
    email: 'oscar@gmail.com',
    password: 'hola',
    money: 20000,
  });
  const result = await user.save();
  console.log(result);
};
