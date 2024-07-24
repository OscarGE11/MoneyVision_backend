import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  login,
  logout
} from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const userRouter = Router()

userRouter.post('/', createUser) // Create new user
userRouter.post('/login', login) // Log in
userRouter.post('/logout', logout) // Log out
userRouter.get('/', authMiddleware, getUsers) // Get all users
userRouter.get('/:id', authMiddleware, getUserById) // Get user by ID
userRouter.put('/:id', authMiddleware, updateUser) // Update user by ID
userRouter.delete('/:id', authMiddleware, deleteUser) // Delete user by ID

export default userRouter
