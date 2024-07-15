import { Router } from 'express';
import {
  createMovement,
  getAllMovements,
} from '../controllers/movementController.js';

const movementRouter = Router();

movementRouter.post('/', createMovement);
movementRouter.get('/', getAllMovements);

export default movementRouter;
