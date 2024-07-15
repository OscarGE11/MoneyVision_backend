import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUsers,
} from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/', createUser); // Create new user
userRouter.get('/', getUsers); // Get all users
userRouter.get('/:id', getUserById); // Get user by ID

export default userRouter;
