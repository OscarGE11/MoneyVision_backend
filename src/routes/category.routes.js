import { Router } from 'express'
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory
} from '../controllers/categoryController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/', authMiddleware, createCategory)
router.get('/', authMiddleware, getAllCategories)
router.get('/:id', authMiddleware, getCategoryById)
router.delete('/:id', authMiddleware, deleteCategory)
router.put('/:id', authMiddleware, updateCategory)

export default router
