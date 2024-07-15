import { Router } from 'express';
import {
  createMovement,
  deleteMovement,
  getAllMovements,
  getMovementByID,
  updateMovement,
} from '../controllers/movementController.js';

const movementRouter = Router();

movementRouter.post('/', createMovement);
movementRouter.get('/', getAllMovements);
movementRouter.get('/:id', getMovementByID);
movementRouter.put('/:id', updateMovement);
movementRouter.delete('/:id', deleteMovement);

export default movementRouter;
