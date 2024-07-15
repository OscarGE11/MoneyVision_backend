import { Router } from 'express';
import { createMovement } from '../controllers/movementController.js';

const movementRouter = Router();

movementRouter.post('/', createMovement);

export default movementRouter;
