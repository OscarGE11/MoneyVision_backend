import { UserModel } from '../models/User.js'
import {
  idSchema,
  userSchema,
  userSchema as userValidationschema
} from '../utils/validation.js'

// Create new user
export const createUser = async (req, res) => {
  const { error, value } = userValidationschema.validate(req.body)

  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation error', errs: error.details })
  }

  try {
    const newUser = new UserModel(value)
    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    /* 11000 is the code that MongoDB throws when a key value is duplicated
    and is defined as unique. */

    if (error.code === 11000) {
      const duplicateCategory = Object.keys(error.keyValue)[0]
      res.status(409).json({ message: `${duplicateCategory} already exists` })
    }
    res.status(500).json({ message: 'Error creating the user:' })
  }
}

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate('transactions', 'title')
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error getting all users:' })
  }
}

// Get user by ID
export const getUserById = async (req, res) => {
  const { error } = idSchema.validate(req.params)

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid ID format', errors: error.details })
  }

  try {
    const user = await UserModel.findById(req.params.id).populate(
      'transactions',
      'title'
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error getting the user:' })
  }
}

// Update user's data
export const updateUser = async (req, res) => {
  const { error: idError } = idSchema.validate({ id: req.params.id })

  if (idError) {
    return res
      .status(400)
      .json({ message: 'Invalid ID format', errors: idError.details })
  }

  const { error: bodyError, value } = userSchema.validate(req.body)

  if (bodyError) {
    return res
      .status(400)
      .json({ message: 'Invalid body format', errors: bodyError.details })
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      value,
      {
        new: true // returns the updated user
      }
    )

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' })
    }

    res.status(202).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: 'Error updating the user' })
  }
}

// Delete a user by ID
export const deleteUser = async (req, res) => {
  const { error } = idSchema.validate(req.params)

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid ID format', errors: error.details })
  }

  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id)

    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' })
    }

    res.status(204).json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the user' })
  }
}
