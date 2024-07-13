import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
    money: Number,
  },
  { versionKey: false }
);

const UserModel = mongoose.model('users', userSchema);

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
