import { Router } from 'express'
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionByID,
  updateTransaction
} from '../controllers/transactionController.js'

const transactionRouter = Router()

transactionRouter.post('/', createTransaction)
transactionRouter.get('/', getAllTransactions)
transactionRouter.get('/:id', getTransactionByID)
transactionRouter.put('/:id', updateTransaction)
transactionRouter.delete('/:id', deleteTransaction)

export default transactionRouter
