import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/categoryController.js';

const router = Router();

router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);

export default router;
