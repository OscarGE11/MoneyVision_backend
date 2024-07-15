import { UserModel } from '../models/User.js';

// Create new user
export const createUser = async (req, res) => {
  const { name, username, email, password, money, movements } = req.body;

  try {
    const newUser = new UserModel({
      name,
      username,
      email,
      password,
      money,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating the user:', error });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate('movements', 'title');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting all users:', error });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate(
      'movements',
      'title'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error getting the user:', error });
  }
};
