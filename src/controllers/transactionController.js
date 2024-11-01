import { TransactionModel } from '../models/Transactions.js'
import { CategoryModel } from '../models/Category.js'
import { transactionSchema as transactionValidationSchema } from '../validations/transactionValidationSchema.js'
import { UserModel } from '../models/User.js'
import { TYPE_OF_TRANSACTION_ENUM } from '../utils/ENUMS.js'

// Function for creating a Transaction
export const createTransaction = async (req, res) => {
  const { error, value } = transactionValidationSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      error: error.details.map((detail) => detail.message)
    })
  }

  // Check if category exists
  const category = await CategoryModel.findById(value.category)
  if (!category) {
    return res.status(404).json({ message: 'Category not found' })
  }

  // Check if user exists
  const user = await UserModel.findById(value.user)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  try {
    const newTransaction = new TransactionModel(value)
    const savedTransaction = await newTransaction.save()

    if (value.typeOfTransaction === TYPE_OF_TRANSACTION_ENUM[1]) {
      user.money -= value.amount
    } else if (value.typeOfTransaction === TYPE_OF_TRANSACTION_ENUM[0]) {
      user.money += value.amount
    }

    user.transactions.push(savedTransaction._id) // Add transaction to user
    await user.save()

    // Populate category to receive the full object instead of the category ID
    const populatedTransaction = await TransactionModel.findById(
      savedTransaction._id
    ).populate('category')

    res.status(201).json(populatedTransaction)
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

  // Check if category exists
  const category = await CategoryModel.findById(value.category)
  if (!category) {
    return res.status(404).json({ message: 'Category not found' })
  }

  // Check if user exists
  const user = await UserModel.findById(value.user)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  try {
    const existingTransaction = await TransactionModel.findById(req.params.id)
    if (!existingTransaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    if (existingTransaction.typeOfTransaction === TYPE_OF_TRANSACTION_ENUM[1]) {
      user.money += existingTransaction.amount
    } else if (
      existingTransaction.typeOfTransaction === TYPE_OF_TRANSACTION_ENUM[0]
    ) {
      user.money -= existingTransaction.amount
    }

    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      req.params.id,
      value,
      {
        new: true
      }
    )

    if (updateTransaction.typeOfTransaction === TYPE_OF_TRANSACTION_ENUM[1]) {
      user.money -= updateTransaction.amount
    } else if (
      updateTransaction.typeOfTransaction === TYPE_OF_TRANSACTION_ENUM[0]
    ) {
      user.money += updateTransaction.amount
    }
    await user.save()
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
