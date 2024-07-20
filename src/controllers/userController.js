import { UserModel } from '../models/User.js'
import { userSchema as userValidationschema } from '../validations/userValidationSchema.js'

// Create new user
export const createUser = async (req, res) => {
  const { error, value } = userValidationschema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      error: error.details.map((detail) => detail.message)
    })
  }

  try {
    const newUser = new UserModel(value)
    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    // 11000 = MongoDB error if unique key value is duplicated
    if (error.code === 11000) {
      const duplicatedKey = Object.keys(error.keyValue)[0]
      res.status(409).json({ message: `${duplicatedKey} already exists` })
    }
    res.status(500).json({ message: 'Error creating the user' })
  }
}

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate('transactions', 'title')
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error getting all users' })
  }
}

// Get user by ID
export const getUserById = async (req, res) => {
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
    res.status(500).json({ message: 'Error getting the user' })
  }
}

// Update user's data
export const updateUser = async (req, res) => {
  const { error, value } = await userValidationschema.validateAsync(req.body)

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      error: error.details.map((detail) => detail.message)
    })
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
