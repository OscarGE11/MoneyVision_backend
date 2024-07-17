import { TransactionModel } from '../models/Transactions.js';

// Function for creating a Transaction
export const createTransaction = async (req, res) => {
  const { title, description, amount, typeOfTransaction, category } = req.body;

  try {
    const newTransaction = new TransactionModel({
      title,
      description,
      amount,
      typeOfTransaction,
      // category: req.category.id,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: 'Error creating the Transaction', err });
  }
};

// Function for getting all the Transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find().populate(
      'category',
      'name'
    );
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error getting the transactions', err });
  }
};

// Function for getting one Transaction

export const getTransactionByID = async (req, res) => {
  try {
    const transaction = await TransactionModel.findById(req.params.id).populate(
      'category',
      'name'
    );

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      });
    }
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Error getting the transaction', err });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transactionUpdate = await TransactionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!transactionUpdate) {
      res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(202).json(transactionUpdate);
  } catch (err) {
    res.status(500).json({ message: 'Error updating the transaction' });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await TransactionModel.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(204).json({ message: 'Transaction deleted' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting the transaction', error: err.message });
  }
};
