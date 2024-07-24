import { Router } from 'express'
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionByID,
  updateTransaction
} from '../controllers/transactionController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const transactionRouter = Router()

transactionRouter.post('/', authMiddleware, createTransaction)
transactionRouter.get('/', authMiddleware, getAllTransactions)
transactionRouter.get('/:id', authMiddleware, getTransactionByID)
transactionRouter.put('/:id', authMiddleware, updateTransaction)
transactionRouter.delete('/:id', authMiddleware, deleteTransaction)

export default transactionRouter
