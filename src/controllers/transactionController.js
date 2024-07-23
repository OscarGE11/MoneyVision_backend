import { TransactionModel } from '../models/Transactions.js'
import { transactionSchema as transactionValidationSchema } from '../validations/transactionValidationSchema.js'
import { UserModel } from '../models/User.js'

// Function for creating a Transaction
export const createTransaction = async (req, res) => {
  const { error, value } = transactionValidationSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      error: error.details.map((detail) => detail.message)
    })
  }

  try {
    const newTransaction = new TransactionModel(value)

    const savedTransaction = await newTransaction.save()

    // Look for the user which is the owner of the transaction
    const user = await UserModel.findById(value.user)

    // If exists, add the transaction to the user's transactions array
    if (user) {
      user.transactions.push(savedTransaction._id)
      await user.save()
    }

    res.status(201).json(newTransaction)
  } catch (error) {
    // 11000 = MongoDB error if unique key value is duplicated
    if (error.code === 11000) {
      const duplicatedKey = Object.keys(error.keyValue)[0]
      res.status(409).json({ message: `${duplicatedKey} already exists` })
    }
    res.status(500).json({ message: 'Error creating the Transaction' })
  }
}

// Function for getting all the Transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find()
      .populate('category', 'name')
      .populate('user', 'name')
    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json({ message: 'Error getting the transactions' })
  }
}

// Function for getting one Transaction
export const getTransactionByID = async (req, res) => {
  try {
    const transaction = await TransactionModel.findById(req.params.id)
      .populate('category', 'name')
      .populate('user', 'name')

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
  const { error, value } = transactionValidationSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      error: error.details.map((detail) => detail.message)
    })
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
