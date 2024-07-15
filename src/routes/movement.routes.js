import { Router } from 'express';
import { createMovement } from '../controllers/movementController.js';
import { showMovements } from '../models/Movement.js';

const movementRouter = Router();

movementRouter.post('/', createMovement);
movementRouter.get('/', showMovements);

export default movementRouter;
