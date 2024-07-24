import { Router } from 'express'
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} from '../controllers/userController.js'

const userRouter = Router()

userRouter.get('/', getUsers) // Get all users
userRouter.get('/:id', getUserById) // Get user by ID
userRouter.put('/:id', updateUser) // Update user by ID
userRouter.delete('/:id', deleteUser) // Delete user by ID

export default userRouter
