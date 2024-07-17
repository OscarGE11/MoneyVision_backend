import { TransactionModel } from '../models/Transactions.js'

// Function for creating a Transaction
export const createTransaction = async (req, res) => {
  const { title, description, amount, typeOfTransaction } = req.body

  try {
    const newTransaction = new TransactionModel({
      title,
      description,
      amount,
      typeOfTransaction
      // category: req.category.id,
    })

    await newTransaction.save()
    res.status(201).json(newTransaction)
  } catch (error) {
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
  try {
    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
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
