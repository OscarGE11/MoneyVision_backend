import { TransactionModel } from '../models/Transactions.js'
import {
  idSchema,
  transactionSchema as transactionValidationSchema
} from '../utils/validation.js'

// Function for creating a Transaction
export const createTransaction = async (req, res) => {
  const { error, value } = transactionValidationSchema.validate(req.body)

  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation error', error: error.details })
  }

  try {
    const newTransaction = new TransactionModel(value)

    await newTransaction.save()
    res.status(201).json(newTransaction)
  } catch (error) {
    /* 11000 is the code that MongoDB throws when a key value is duplicated
    and is defined as unique. */

    if (error.code === 11000) {
      const duplicateCategory = Object.keys(error.keyValue)[0]
      res.status(409).json({ message: `${duplicateCategory} already exists` })
    }
    res.status(500).json({ message: 'Error creating the Transaction' })
  }
}

// Function for getting all the Transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find().populate(
      'category',
      'name'
    )
    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json({ message: 'Error getting the transactions' })
  }
}

// Function for getting one Transaction
export const getTransactionByID = async (req, res) => {
  const { error } = idSchema.validate(req.params)

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid ID format', errors: error.details })
  }

  try {
    const transaction = await TransactionModel.findById(req.params.id).populate(
      'category',
      'name'
    )

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      })
    }
    res.status(200).json(transaction)
  } catch (error) {
    res.status(500).json({ message: 'Error getting the transaction' })
  }
}

// Update transaction's data
export const updateTransaction = async (req, res) => {
  const { error: idError } = idSchema.validate({ id: req.params.id })

  if (idError) {
    return res
      .status(400)
      .json({ message: 'Invalid ID format', errors: idError.details })
  }

  const { error: bodyError, value } = transactionValidationSchema.validate(
    req.body
  )

  if (bodyError) {
    return res
      .status(400)
      .json({ message: 'Validation error', errors: bodyError.details })
  }

  try {
    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      req.params.id,
      value,
      {
        new: true
      }
    )
    if (!updatedTransaction) {
      res.status(404).json({ message: 'Transaction not found' })
    }
    res.status(202).json(updatedTransaction)
  } catch (error) {
    res.status(500).json({ message: 'Error updating the transaction' })
  }
}

// Delete a transaction by ID
export const deleteTransaction = async (req, res) => {
  const { error } = idSchema.validate(req.params)

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid ID format', errors: error.details })
  }
  try {
    const deletedTransaction = await TransactionModel.findByIdAndDelete(
      req.params.id
    )

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    res.status(204).json({ message: 'Transaction deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the transaction' })
  }
}
