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

// Update a user's data
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
    }

    res.status(202).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating the user' });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting the user' });
  }
};