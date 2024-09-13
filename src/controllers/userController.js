import { UserModel } from '../models/User.js'
import { userSchema as userValidationschema } from '../validations/userValidationSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

// Create new user
export const register = async (req, res) => {
  const { error, value } = userValidationschema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      error: error.details.map((detail) => detail.message)
    })
  }

  try {
    // Hashing the password
    const salt = await bcrypt.genSalt(10)
    value.password = await bcrypt.hash(value.password, salt)

    const newUser = new UserModel(value)
    await newUser.save()

    // Generate token
    const token = jwt.sign({ id: newUser.id }, config.jwtSecret)

    res
      .cookie(config.accessToken, token, { httpOnly: true, sameSite: 'strict' })
      .status(201)
      .json({ message: 'User created Succesfully', username: newUser.username })
  } catch (error) {
    // 11000 = MongoDB error if unique key value is duplicated
    if (error.code === 11000) {
      const duplicatedKey = Object.keys(error.keyValue)[0]
      res.status(409).json({ message: `${duplicatedKey} already exists` })
    }
    res.status(500).json({ message: 'Error creating the user' })
  }
}

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Email not found' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ message: 'Password is incorrect' })
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: '1h'
    })

    res
      .cookie(config.accessToken, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/'
      })
      .status(200)
      .json({ token, user: { username: user.username, email: user.email } })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' })
  }
}

export const logout = (req, res) => {
  res.clearCookie(config.accessToken)
  res.status(200).json({ message: 'Logged out successfully' })
}

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate({
      path: 'transactions',
      populate: {
        path: 'category',
        select: 'name'
      }
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error getting all users' })
  }
}

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate({
      path: 'transactions',
      populate: {
        path: 'category',
        select: 'name'
      }
    })

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

    res.status(202).json({
      message: 'User updated Succesfully',
      username: updatedUser.username
    })
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

    res
      .clearCookie(config.accessToken)
      .status(204)
      .json({ message: 'User deleted succesfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the user' })
  }
}
