import mongoose, { Schema } from 'mongoose'
import { TYPE_OF_TRANSACTION_ENUM } from '../utils/ENUMS.js'

const transactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    typeOfTransaction: {
      type: String,
      enum: TYPE_OF_TRANSACTION_ENUM,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const TransactionModel = mongoose.model('Transaction', transactionSchema)
